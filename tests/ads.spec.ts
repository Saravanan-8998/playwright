import { expect, test, Page } from "@playwright/test";
import { JavaScriptAds } from "../pageObjects/ads";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let ads: JavaScriptAds;
let page: any;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.ads);
    ads = new JavaScriptAds(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check javascript ads in automatenow sandbox', async () => {
    test('Should wait for the Ads to load and verify the add content', async () => {
        await expect(page).toHaveURL(/.*ads/);
        await page.evaluateHandle(() => document.body);
        await page.waitForTimeout(6000);
        await ads.textValue();
        await ads.closeDiv();
    });
});

test.afterEach(async () => {
    await page.close();
});