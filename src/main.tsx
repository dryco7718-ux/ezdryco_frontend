import { createRoot } from "react-dom/client";
import {
  setBaseUrl,
  setAuthTokenGetter,
  setRefreshHandler,
  setAuthFailureHandler,
} from "@/lib/api-client-react";
import { getSessionToken } from "@/lib/session";
import { refreshAccessToken, handleAuthFailure } from "@/lib/auth-refresh";
import App from "./App";
import "./index.css";

function formatWindowError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    return `${error.message}\n${error.stack ?? ""}`.trim();
  }

  if (typeof error === "string") {
    return error;
  }

  return fallbackMessage;
}

// Log runtime errors without wiping the React tree. Recoverable errors (e.g. a
// rejected fetch handled by React Query) must not blank the whole app.
window.addEventListener("error", (e) => {
  console.error("[window.error]", formatWindowError(e.error, e.message));
});

window.addEventListener("unhandledrejection", (e) => {
  console.error(
    "[unhandledrejection]",
    formatWindowError(e.reason, "Unhandled promise rejection"),
  );
});

try {
  const defaultLocalApiBaseUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "http://localhost:8080"
    : "";
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.trim() ||
    import.meta.env.VITE_API_URL?.trim() ||
    defaultLocalApiBaseUrl;

  if (apiBaseUrl) {
    setBaseUrl(apiBaseUrl);
  }
  // Attach session token from localStorage to API requests
  setAuthTokenGetter(() => getSessionToken());
  // Auto-refresh the access token on 401 and retry once; on failure, sign out.
  setRefreshHandler(refreshAccessToken);
  setAuthFailureHandler(handleAuthFailure);

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = createRoot(rootElement);
  root.render(<App />);
} catch (e: any) {
  console.error("[main.tsx] Fatal error:", e);
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: red;">
        <h2>Fatal Error</h2>
        <pre style="background: #fee; padding: 10px; overflow: auto;">${e.message}\n${e.stack || ""}</pre>
      </div>
    `;
  }
}
