import { expect, test, Page } from "@playwright/test";
import JavaScriptDelays from "../pageObjects/javaScript_delays";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import { Constants } from "../constants/constants";

let page: Page;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check javascript delay in automatenow sandbox', async () => {
    let javascriptDelay: JavaScriptDelays;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.delays);
        javascriptDelay = new JavaScriptDelays(page);
    });

    test('should click the start and wait for the delay time', async () => {
        await javascriptDelay.clickOnStart();
        await page.waitForTimeout(10000);
        const textValue = await javascriptDelay.textValue();
        expect(textValue).toBe(Constants.delayVerification);
    });

    test.afterAll(async () => {
        page.close();
    })
});