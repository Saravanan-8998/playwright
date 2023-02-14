import { expect, test, Page } from "@playwright/test";
import JavaScriptAds from "../pageObjects/javaScript_ads";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import { Constants } from "../constants/constants";

let page: Page;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check javascript ads in automatenow sandbox', async () => {
    let javascriptAds: JavaScriptAds;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.ads);
        javascriptAds = new JavaScriptAds(page);
    });

    test('Should wait for the Ads to load and verify the add content', async () => {
        await page.waitForTimeout(6000);
        let textValue = await javascriptAds.textValue();
        expect(textValue).toBe(Constants.adsAssertion);
        await javascriptAds.closeDiv();
    });

    test.afterAll(async () => {
        page.close();
    })
});