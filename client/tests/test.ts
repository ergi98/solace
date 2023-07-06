import { expect, test } from "@playwright/test";

test("index page has expected h1", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("heading", { name: "Anime List" }),
    ).toBeVisible();
});

test("index page can favorite anime", async ({ page }) => {
    await page.goto("/");

    const link = await page
        .getByTestId("animeLink")
        .first()
        .getAttribute("href");

    await page.goto(link as string);

    await expect(
        page.getByRole("button", { name: "Add to favorites" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Add to favorites" }).click();

    const response = await page.waitForResponse((response) =>
        response.url().includes("/addToFavorites"),
    );

    expect(response.status()).toEqual(200);
});
