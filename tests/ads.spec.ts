import { expect, test, Page } from "@playwright/test";
import Ads from "../pageObjects/ads";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";

let page: Page;

test.describe('Should check javascript ads in automatenow sandbox', async () => {
    let ads: Ads;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.ads);
        ads = new Ads(page);
    });

    test('Should wait for the Ads to load and verify the add content', async () => {
        await expect(page).toHaveURL(/.*ads/);
        await page.waitForTimeout(6000);
        await ads.textValue();
        await ads.closeDiv();
    });
});