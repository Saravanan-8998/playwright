import { expect, test, Page } from "@playwright/test";
import { Spinners } from "../pageObjects/spinner";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import { Constants } from "../constants/constants";

let page: Page;
let spinner: Spinners;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check all spinner functionality in automatenow sandbox', async () => {

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