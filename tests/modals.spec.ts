import { expect, test, Page } from "@playwright/test";
import { Modals } from "../pageObjects/modals";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;

test.describe('Should check javascript modals in automatenow sandbox', async () => {
    let modals: Modals;

    test.beforeAll(async () => {
        page = (await myBrowserFixture()).page;
        await page.goto(subURL.modals);
        modals = new Modals(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    test('Should check click events for simple modals', async () => {
        await expect(page).toHaveURL(/.*modals/);
        await modals.clickSimpleModal();
        await modals.closeSimpleModal();
    });

    test('Should check click events for form modals', async () => {
        await modals.clickFormModal();
        await modals.formFill();
        await expect(page).toHaveURL(/.*modals/);
    });
});