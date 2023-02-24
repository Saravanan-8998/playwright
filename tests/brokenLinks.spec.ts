import { expect, test, Page } from "@playwright/test";
import { BrokenLinks } from "../pageObjects/brokenLinks";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let brokenLinks: BrokenLinks;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.brokenLinks);
    brokenLinks = new BrokenLinks(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check all Broken Links functionality in automatenow sandbox', async () => {
    test("Test to check for broken images", async ({ request }) => {
        await expect(page).toHaveURL(/.*broken-links/);
        await brokenLinks.clickBrokenLink();
        await brokenLinks.checkPage();
    });
});

test.afterEach(async () =>{
    await page.close();
});