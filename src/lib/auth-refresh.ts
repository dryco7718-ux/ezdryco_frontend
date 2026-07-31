import {
  getRefreshToken,
  setSessionToken,
  getActiveRole,
  clearSession,
} from "./session";

/** Resolve the backend base URL the same way main.tsx does. */
function getApiBaseUrl(): string {
  const base =
    (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
    (import.meta.env.VITE_API_URL as string | undefined)?.trim() ||
    (typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
      ? "http://localhost:8080"
      : "");
  return (base || "").replace(/\/+$/, "");
}

const REFRESH_TIMEOUT_MS = 10_000;

/**
 * Attempts to obtain a new access token using the stored refresh token.
 * Returns true when a new token was stored. Aborts after 10s.
 */
export async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      signal: controller.signal,
    });

    if (!response.ok) return false;

    const body = await response.json().catch(() => null);
    // Unwrap the unified envelope { success, data: { token }, ... }.
    const token =
      body?.data?.token ?? body?.token ?? null;
    if (typeof token === "string" && token.length > 0) {
      setSessionToken(token);
      return true;
    }
    return false;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Clears the session and routes the user to the sign-in screen for their role. */
export function handleAuthFailure(): void {
  const role = getActiveRole();
  clearSession();

  const target =
    role === "business"
      ? "/business/login"
      : role === "admin"
        ? "/admin/login"
        : "/customer/login";

  if (typeof window !== "undefined" && window.location.pathname !== target) {
    window.location.assign(target);
  }
}
