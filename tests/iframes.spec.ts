import { expect, test, Page } from "@playwright/test";
import Iframes from "../pageObjects/iframes";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let iframes: Iframes;
let page: any;

test.describe('Should check Iframes in automatenow sandbox', async () => {

    test.beforeAll(async () => {
        page = (await myBrowserFixture()).page;
        await page.goto(subURL.iframes);
        iframes = new Iframes(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    test('Should check the Iframes functionality', async () => {
        await expect(page).toHaveURL(/.*iframes/);
        await iframes.mainFunction();
    });
});