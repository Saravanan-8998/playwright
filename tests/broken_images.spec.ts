import { expect, test, Page } from "@playwright/test";
import { BrokenImages } from "../pageObjects/broken_images";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";

let page: Page;
let broken_images: BrokenImages;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check all broken_images functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.broken_images);
        broken_images = new BrokenImages(page);
    });

    test("Test to check for broken images", async ({ request }) => {
        await broken_images.conditionAlt();
        await broken_images.conditionAPI(request);
    });

    test.afterAll(async () => {
        page.close();
    })
});