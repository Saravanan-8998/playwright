import { expect, test, Page } from "@playwright/test";
import { Spinners } from "../pageObjects/spinner";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let spinner: Spinners;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.spinners);
    spinner = new Spinners(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check all popup functionality in automatenow sandbox', async () => {
    test('Should wait for the spinner till the page loads', async () => {
        await expect(page).toHaveURL(/.*spinners/);
        await spinner.spinnerAppeared();
        let expectText = await spinner.textAppeared();
        expect(expectText).toBe(Constants.spinnerText);
    });
});

test.afterEach(async () => {
    await page.close();
});