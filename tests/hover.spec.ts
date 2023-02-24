import { expect, test, Page } from "@playwright/test";
import {Hover} from "../pageObjects/hover";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let hover: Hover;
let page: any;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.hover);
    hover = new Hover(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check hover functionality in automatenow sandbox', async () => {
    test('Should hover the text and assert in to the default text', async () => {
        await expect(page).toHaveURL(/.*hover/);
        await hover.hoverAndGetTextValue();
    });
});

test.afterEach(async () =>{
    await page.close();
});