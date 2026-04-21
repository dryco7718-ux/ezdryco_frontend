import { createRoot } from "react-dom/client";
import { setBaseUrl, setAuthTokenGetter } from "@/lib/api-client-react";
import { getSessionToken } from "@/lib/session";
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

// Global error handler to show errors on screen instead of blank page
window.addEventListener("error", (e) => {
  const root = document.getElementById("root");
  const errorDetails = formatWindowError(e.error, e.message);
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: red;">
        <h2>Runtime Error</h2>
        <pre style="background: #fee; padding: 10px; overflow: auto;">${errorDetails}</pre>
      </div>
    `;
  }
});

window.addEventListener("unhandledrejection", (e) => {
  const root = document.getElementById("root");
  const errorDetails = formatWindowError(e.reason, "Unhandled promise rejection");
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: red;">
        <h2>Unhandled Promise Rejection</h2>
        <pre style="background: #fee; padding: 10px; overflow: auto;">${errorDetails}</pre>
      </div>
    `;
  }
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
