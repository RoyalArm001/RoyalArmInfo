import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: "list",
  use: { baseURL: "http://localhost:3101", trace: "retain-on-failure", ...devices["Desktop Chrome"], channel: "chrome" },
  webServer: [
    { command: "node tests/mock-openai.mjs", url: "http://127.0.0.1:3102/health", reuseExistingServer: false },
    { command: "npx next dev -p 3101", url: "http://localhost:3101", timeout: 120_000, reuseExistingServer: false,
      env: { OPENAI_API_KEY: "test-key-not-real", OPENAI_MODEL: "test-model", OPENAI_BASE_URL: "http://127.0.0.1:3102/v1" } },
  ],
});
