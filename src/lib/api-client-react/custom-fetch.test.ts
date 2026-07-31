import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  customFetch,
  setBaseUrl,
  setAuthTokenGetter,
  setRefreshHandler,
  setAuthFailureHandler,
} from "./custom-fetch";

function envelope(status: number, data: unknown) {
  return new Response(JSON.stringify({ success: status < 400, statusCode: status, data }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function authOf(init: RequestInit | undefined): string | null {
  const headers = new Headers(init?.headers as HeadersInit);
  return headers.get("authorization");
}

describe("customFetch refresh-on-401", () => {
  let token: string;

  beforeEach(() => {
    setBaseUrl(null);
    token = "old-token";
    setAuthTokenGetter(() => token);
    setAuthFailureHandler(null);
    setRefreshHandler(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("refreshes once on 401 and retries the original request with the new token", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      return authOf(init) === "Bearer new-token"
        ? envelope(200, { ok: true })
        : envelope(401, null);
    });
    vi.stubGlobal("fetch", fetchMock);

    const refresh = vi.fn(async () => {
      token = "new-token";
      return true;
    });
    setRefreshHandler(refresh);

    const result = await customFetch<{ ok: boolean }>("/orders");

    expect(result).toEqual({ ok: true }); // envelope unwrapped
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("performs at most one refresh for concurrent 401s (single-flight)", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      return authOf(init) === "Bearer new-token"
        ? envelope(200, { ok: true })
        : envelope(401, null);
    });
    vi.stubGlobal("fetch", fetchMock);

    let refreshes = 0;
    setRefreshHandler(async () => {
      refreshes += 1;
      await new Promise((r) => setTimeout(r, 10));
      token = "new-token";
      return true;
    });

    await Promise.all([
      customFetch("/orders"),
      customFetch("/customers"),
      customFetch("/businesses"),
    ]);

    expect(refreshes).toBe(1);
  });

  it("clears the session via the failure handler when refresh fails", async () => {
    const fetchMock = vi.fn(async () => envelope(401, null));
    vi.stubGlobal("fetch", fetchMock);

    setRefreshHandler(async () => false);
    const onFailure = vi.fn();
    setAuthFailureHandler(onFailure);

    await expect(customFetch("/orders")).rejects.toMatchObject({ status: 401 });
    expect(onFailure).toHaveBeenCalledTimes(1);
  });

  it("does not attempt refresh on the refresh endpoint itself", async () => {
    const fetchMock = vi.fn(async () => envelope(401, null));
    vi.stubGlobal("fetch", fetchMock);

    const refresh = vi.fn(async () => true);
    setRefreshHandler(refresh);

    await expect(customFetch("/auth/refresh", { method: "POST", body: "{}" })).rejects.toMatchObject({
      status: 401,
    });
    expect(refresh).not.toHaveBeenCalled();
  });
});
