import { expect, test, Page } from "@playwright/test";
import { ClickEvents } from "../pageObjects/clickEvents";
import subURL from "../support/subURL.json";

let page: Page;
let userObject: any = [];

enum assertValues {
    obj1 = "Meow!",
    obj2 = "Woof!",
    obj3 = "Oink!",
    obj4 = "Moo!",
}

test.describe('Should check javascript clickEvents in automatenow sandbox', async () => {
    let clickEvents: ClickEvents;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.clickEvents);
        clickEvents = new ClickEvents(page);
    });

    test('Should check click events for different objects', async () => {
        await expect(page).toHaveURL(/.*click-events/);
        userObject = [1, 2, 3, 4];
        for (let value of userObject) {
            switch (value) {
                case 1:
                    await clickEvents.clickObj(value);
                    expect(await clickEvents.getValue()).toBe(assertValues.obj1);
                    break;
                case 2:
                    await clickEvents.clickObj(value);
                    expect(await clickEvents.getValue()).toBe(assertValues.obj2);
                    break;
                case 3:
                    await clickEvents.clickObj(value);
                    expect(await clickEvents.getValue()).toBe(assertValues.obj3);
                    break;
                case 4:
                    await clickEvents.clickObj(value);
                    expect(await clickEvents.getValue()).toBe(assertValues.obj4);
                    break;
                default:
                    console.log("None of the objects are selected");
                    break;
            }
        }
    });

    test.afterAll(async () => {
        page.close();
    })
});