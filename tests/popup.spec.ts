import { expect, test, Page } from "@playwright/test";
import { Popups } from "../pageObjects/popup";
import subURL from "../support/subURL.json";

let page: Page;
let popups: Popups;

test.describe('Should check all popup functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.popup);
        popups = new Popups(page);
    });

    test('Should check alert popup functionality', async () => {
        await popups.alertAccept();
        await popups.alertMsg();
    });

    test('Should check confirm popup functionality', async () => {
        await popups.alertConfirmAccept();
        await popups.alertConfirmMsg();
        await popups.alertConfirmDecline();
    });

    test('Should check prompt popup functionality', async () => {
        await popups.alertPromptAccept();
        await popups.alertPromptMsg();
        await popups.alertPromptDecline();
    });

    test('Should check tooltip functionality', async () => {
        await popups.toolTip();
    });

    test.afterAll(async () => {
        page.close();
    })
});