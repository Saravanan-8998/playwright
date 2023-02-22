import { expect, test, Page } from "@playwright/test";
import Accordions from "../pageObjects/accordions";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let accordions: Accordions;
let page: any;

test.describe('Should check Accordions in automatenow sandbox', async () => {

    test.beforeAll(async () => {
        page = (await myBrowserFixture()).page;
        await page.goto(subURL.accordions);
        accordions = new Accordions(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    test('Should check the Accordions functionality', async () => {
        await expect(page).toHaveURL(/.*accordions/);
        await accordions.clickAcc();
        await accordions.verifyAcc();
    });
});