import { expect, test, Page } from "@playwright/test";
import JavaScriptDelays from "../pageObjects/javaScript_delays";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";

let page: Page;

test.describe('Should check javascript delay in automatenow sandbox', async () => {
    let javascriptDelay: JavaScriptDelays;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.delays);
        javascriptDelay = new JavaScriptDelays(page);
    });

    test('should click the start and wait for the delay time', async () => {
        await expect(page).toHaveURL(/.*javascript-delays/);
        await javascriptDelay.clickOnStart();
        await page.waitForTimeout(10000);
        const textValue = await javascriptDelay.textValue();
        expect(textValue).toBe(Constants.delayVerification);
    });

});