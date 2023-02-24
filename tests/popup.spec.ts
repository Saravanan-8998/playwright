import { expect, test, Page } from "@playwright/test";
import { Popups } from "../pageObjects/popup";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let popups: Popups;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.popup);
    popups = new Popups(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check alert popup functionality in automatenow sandbox', async () => {
    test('Should check alert popup functionality', async () => {
        await popups.alertAccept();
        await popups.alertMsg();
        await page.close();
    });
});

test.describe('Should check confirm popup functionality in automatenow sandbox', async () => {
    test('Should check confirm popup functionality', async () => {
        await popups.alertConfirmAccept();
        await popups.alertConfirmMsg();
        await popups.alertConfirmDecline();
        await page.close();
    });
});

test.describe('Should check prompt popup and tooltip functionality in automatenow sandbox', async () => {
    test('Should check prompt popup functionality', async () => {
        await popups.alertPromptAccept();
        await popups.alertPromptMsg();
        await popups.alertPromptDecline();
        await page.close();
    });

    test('Should check tooltip functionality', async () => {
        await popups.toolTip();
        await page.close();
    });
});

test.afterEach(async () => {
    await page.close();
});