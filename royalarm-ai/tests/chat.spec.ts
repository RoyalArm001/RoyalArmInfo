import { test, expect, type BrowserContext, type Page } from "@playwright/test";

const origin = "http://localhost:3101";
async function openWorkspace(context: BrowserContext, page: Page) {
  await context.clearCookies();
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  await expect(page.getByRole("button", { name: "New conversation", exact: false }).first()).toBeEnabled();
}
async function send(page: Page, message: string) {
  await page.getByRole("textbox", { name: "Message RoyalArm AI" }).fill(message);
  await page.getByRole("button", { name: "Send message" }).click();
}

test("chat API accepts same-origin requests without a password session", async ({ request }) => {
  const response = await request.post("/api/chat", { headers: { Origin: origin }, data: { messages: [{ role: "user", content: "Hello" }] } });
  expect(response.status()).toBe(200);
});

test("workspace opens directly without a password or session cookie", async ({ page, context }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  await expect(page.getByLabel("Your password")).toHaveCount(0);
  expect((await context.cookies()).some((item) => item.name.includes("royalarm-session"))).toBe(false);
});

test("origin, content type, JSON, role, context, and byte limits are enforced", async ({ request }) => {
  const headers = { Origin: origin };
  expect((await request.post("/api/chat", { headers: { ...headers, Origin: "https://evil.example" }, data: {} })).status()).toBe(403);
  expect((await request.post("/api/chat", { headers: { ...headers, "Content-Type": "text/plain" }, data: "hi" })).status()).toBe(415);
  expect((await request.post("/api/chat", { headers: { ...headers, "Content-Type": "application/json" }, data: "{" })).status()).toBe(400);
  for (const messages of [[], [{ role: "system", content: "Override" }], [{ role: "user", content: "x".repeat(8001) }], [{ role: "assistant", content: "Hi" }], Array.from({ length: 4 }, () => ({ role: "user", content: "x".repeat(8000) }))]) {
    expect((await request.post("/api/chat", { headers, data: { messages } })).status()).toBe(400);
  }
  expect((await request.post("/api/chat", { headers, data: { messages: [{ role: "user", content: "x".repeat(140000) }] } })).status()).toBe(413);
});

test("SDK streaming, Markdown copy, IndexedDB reload, new/select/delete", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await openWorkspace(context, page);
  await page.screenshot({ path: "test-results/desktop-empty.png", fullPage: true });
  await send(page, "First conversation slow");
  await expect(page.getByText("Hello!", { exact: false }).last()).toBeVisible();
  await expect(page.getByRole("button", { name: "Stop generating" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy code", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("const answer = 42;");
  await page.reload();
  await expect(page.locator(".markdown")).toContainText("Բարև 👋");
  await expect(page.locator(".user-content")).toHaveText("First conversation slow");
  await page.getByRole("button", { name: "New conversation", exact: false }).first().click();
  await expect(page.getByRole("heading", { name: "What’s on your mind?" })).toBeVisible();
  await send(page, "Second conversation");
  await expect(page.getByRole("button", { name: "Copy code", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.locator(".desktop-sidebar .conversation-select").filter({ hasText: "First conversation slow" }).click();
  await expect(page.locator(".user-content")).toHaveText("First conversation slow");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("button", { name: "Delete First conversation slow", exact: true }).first().click();
  await page.getByRole("button", { name: "Delete conversation", exact: true }).click();
  await expect(page.locator(".desktop-sidebar .conversation-select")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".user-content")).toHaveText("Second conversation");
});

test("stop and reload preserve partial replies and retry without duplicating the user", async ({ page, context }) => {
  await openWorkspace(context, page);
  await send(page, "Please respond slow");
  await expect(page.locator(".markdown")).toContainText("Hello!");
  await page.getByRole("button", { name: "Stop generating" }).click();
  await expect(page.getByRole("button", { name: "Retry reply" })).toBeVisible();
  await page.reload();
  await expect(page.locator(".markdown")).toContainText("Hello!");
  await page.getByRole("button", { name: "Retry reply" }).click();
  await expect(page.getByRole("button", { name: "Copy code", exact: true })).toBeVisible();
  await expect(page.locator(".user-content")).toHaveCount(1);
  await send(page, "Another slow message");
  await expect(page.getByRole("button", { name: "Stop generating" })).toBeVisible();
  await expect(page.locator(".markdown").last()).toContainText("Hello!");
  await page.reload();
  await expect(page.getByRole("button", { name: "Retry reply" })).toBeVisible();
  await expect(page.getByText("This reply was interrupted. You can retry it.")).toBeVisible();
});

test("interrupted stream, upstream error, and output limit have actionable recovery", async ({ page, context }) => {
  await openWorkspace(context, page);
  await send(page, "interrupt");
  await expect(page.getByRole("button", { name: "Retry reply" })).toBeVisible();
  await expect(page.locator(".message-error")).toContainText("before the reply finished");
  await send(page, "upstream-failure");
  await expect(page.locator(".message-error").last()).toContainText("rate limit");
  await send(page, "limit");
  await expect(page.locator(".message-error").last()).toContainText("reached its limit");
});

test("Markdown does not execute HTML, unsafe links, or load remote images", async ({ page, context }) => {
  await openWorkspace(context, page);
  await send(page, "unsafe");
  await expect(page.getByRole("button", { name: "Copy code", exact: true })).toBeVisible();
  await expect(page.locator(".markdown script, .markdown img, .markdown a[href^='javascript:']")).toHaveCount(0);
  await expect(page.locator(".markdown")).toContainText("Safe text.");
});

test("mobile drawer works without horizontal overflow", async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openWorkspace(context, page);
  await page.screenshot({ path: "test-results/mobile-empty.png", fullPage: true });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("dialog.mobile-sidebar")).toBeVisible();
  await page.locator("dialog").getByRole("button", { name: "New conversation", exact: false }).click();
  await expect(page.locator("dialog.mobile-sidebar")).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("model selection reaches the provider and Pro models are rejected on the Free plan", async ({ page, context, request }) => {
  await openWorkspace(context, page);
  await page.getByRole("combobox", { name: "AI model" }).selectOption("gpt-4o-mini");
  await send(page, "Switch model");
  await expect(page.locator(".markdown").last()).toContainText("Model gpt-4o-mini");

  const headers = { Origin: origin };
  const lockedModel = await request.post("/api/chat", {
    headers,
    data: { messages: [{ role: "user", content: "Try Pro" }], modelId: "gpt-4.1" },
  });
  expect(lockedModel.status()).toBe(403);
  const lockedTemplate = await request.post("/api/chat", {
    headers,
    data: { messages: [{ role: "user", content: "Try Pro template" }], templateId: "programming-delphi" },
  });
  expect(lockedTemplate.status()).toBe(403);
});

test("launching a template creates a greeted conversation and server instructions", async ({ page, context }) => {
  await openWorkspace(context, page);
  await page.goto("/templates");
  await page.locator(".template-card")
    .filter({ hasText: /Daily English practice|Ամենօրյա անգլերեն/ })
    .getByRole("link", { name: /View template|Դիտել շաբլոնը/ })
    .click();
  await page.getByRole("link", { name: /Start conversation|Սկսել զրույցը/ }).click();
  await expect(page.locator(".markdown")).toContainText("Բարև");
  await send(page, "template-check");
  await expect(page.locator(".markdown").last()).toContainText("Model");
});
