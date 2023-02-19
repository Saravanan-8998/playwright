import { expect, test, Page } from "@playwright/test";
import { ClickEvents } from "../pageObjects/clickEvents";
import subURL from "../support/subURL.json";

let page: Page;
let userObject: any = [];

test.describe('Should check javascript clickEvents in automatenow sandbox', async () => {
    let clickEvents: ClickEvents;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.clickEvents);
        clickEvents = new ClickEvents(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    test('Should check click events for different objects', async () => {
        await clickEvents.clickAllEvents();
    });
});