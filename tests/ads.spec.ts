import { expect, test, Page } from "@playwright/test";
import Ads from "../pageObjects/ads";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import { Constants } from "../constants/constants";

let page: Page;

test.use({
    baseURL: allURL.mainURL
});

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
        let textValue = await ads.textValue();
        expect(textValue).toBe(Constants.adsAssertion);
        await ads.closeDiv();
    });

    test.afterAll(async () => {
        page.close();
    })
});