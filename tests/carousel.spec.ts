import { expect, test, Page } from "@playwright/test";
import { Carousel } from "../pageObjects/carousel";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let carousel: Carousel;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.carousel);
    carousel = new Carousel(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check all carousel functionality in automatenow sandbox', async () => {
    test("Test to check carousel functionality", async ({ request }) => {
        await expect(page).toHaveURL(/.*carousel/);
        await carousel.checkAllCarouselFunctionality();
        await page.close();
    });
});

test.afterEach(async () =>{
    await page.close();
});