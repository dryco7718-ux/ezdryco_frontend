import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

// Vitest scoped to unit tests under src/. Playwright e2e specs (e2e/**) are run
// separately by Playwright and must not be collected here.
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
  },
});
