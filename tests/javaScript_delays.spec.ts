import { expect, test, Page } from "@playwright/test";
import { JavaScriptDelays } from "../pageObjects/javaScript_delays";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let javascriptDelay: JavaScriptDelays;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.delays);
    javascriptDelay = new JavaScriptDelays(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check javascript delay in automatenow sandbox', async () => {
    test('should click the start and wait for the delay time', async () => {
        await expect(page).toHaveURL(/.*javascript-delays/);
        await javascriptDelay.clickOnStart();
        await page.waitForTimeout(10000);
        await javascriptDelay.textValue();
    });
});

test.afterEach(async () => {
    await page.close();
});