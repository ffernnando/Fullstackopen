const { test, expect, beforeEach, describe } = require("@playwright/test");

const loginWith = async (page) => {
  await page.getByRole("button", { name: "login" }).click();
  await expect(page.getByText("Log in to application")).toBeVisible();
  await page.getByTestId("username").fill("BBR");
  await page.getByTestId("password").fill("password123");
  await page.getByRole("button", { name: "login" }).click();
};

const createNew = async (page) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("title").fill("Critique of the critical critique");
  await page.getByTestId("author").fill("Kmax");
  await page.getByTestId("url").fill("www.telegram.ru");
  await page.getByRole("button", { name: "create" }).click();
  // Wait for blog to appear in the UI
  await page.waitForSelector(`text=Critique of the critical critique Kmax`, {
    timeout: 5000,
  });
};

export { loginWith, createNew };
