import { expect, test, Page } from "@playwright/test";
import { Spinners } from "../pageObjects/spinner";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";

let page: Page;
let spinner: Spinners;

test.describe('Should check all popup functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.spinners);
        spinner = new Spinners(page);
    });

    test('Should wait for the spinner till the page loads', async () => {
        await spinner.spinnerAppeared();
        let expectText = await spinner.textAppeared();
        expect(expectText).toBe(Constants.spinnerText);
    });

    test.afterAll(async () => {
        page.close();
    })
});