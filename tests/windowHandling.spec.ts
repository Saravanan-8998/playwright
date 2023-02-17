import { chromium, expect, test, Page } from "@playwright/test";
import { WindowHandling } from "../pageObjects/windowHandling";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";

let page: Page;
let browser: any, context: any;
let windowHandling: WindowHandling;
let searchLocator: string = `input[name='q']`;

test.describe('Should check all Window Handling functionality in automatenow sandbox', async () => {

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(subURL.window_handling);
        await page.waitForTimeout(10000);
        windowHandling = new WindowHandling(page);
    });

    test('Should check the new tab functionality', async () => {
        await windowHandling.clickNewTab();
        const pagePromise = context.waitForEvent('page');
        const newPage = await pagePromise;
        await newPage.fill(searchLocator, Constants.searchText);
        await newPage.keyboard.press('Enter');
        await expect(newPage).toHaveURL(/.*Typescript/);
    });

    test('Should check the new window functionality', async () => {
        const [newWindow] = await Promise.all([
            page.waitForEvent("popup"),
            page.click("'New Window'"),
        ]);
        newWindow.fill(searchLocator, Constants.searchText1);
        await newWindow.locator(await windowHandling.clickGoogleSearchBtn()).click();
        await expect(newWindow).toHaveURL("https://www.google.com/");
    });

    test('Should replace the current window with new url', async () => {
        await windowHandling.clickreplacebtn();
        await expect(page).toHaveURL(/.*google/);
    });

    test.afterAll(async () => {
        page.close();
    })
});