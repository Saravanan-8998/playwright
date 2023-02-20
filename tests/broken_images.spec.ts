import { expect, test, Page } from "@playwright/test";
import { BrokenImages } from "../pageObjects/broken_images";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let broken_images: BrokenImages;

test.describe('Should check all broken_images functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = (await myBrowserFixture()).page;
        await page.goto(subURL.broken_images);
        broken_images = new BrokenImages(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    test("Test to check for broken images", async ({ request }) => {
        await expect(page).toHaveURL(/.*broken-images/);
        await broken_images.conditionAlt();
        await broken_images.conditionAPI(request);
    });
});