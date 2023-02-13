import { expect, test, Page } from "@playwright/test";
import { JavaScriptClickEvents } from "../pageObjects/javaScript_clickEvents";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";

let page: Page;
let userObject: any = [];

test.use({
    baseURL: allURL.mainURL
});

enum assertValues {
    obj1 = "Meow!",
    obj2 = "Woof!",
    obj3 = "Oink!",
    obj4 = "Moo!",
}

test.describe('Should check javascript clickEvents in automatenow sandbox', async () => {
    let javascriptclickEvents: JavaScriptClickEvents;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.clickEvents);
        javascriptclickEvents = new JavaScriptClickEvents(page);
    });

    test('Should check click events for different objects', async () => {
        userObject = [1, 2, 3, 4];
        for (let value of userObject) {
            switch (value) {
                case 1:
                    await javascriptclickEvents.clickObj(value);
                    expect(await javascriptclickEvents.getValue()).toBe(assertValues.obj1);
                    break;
                case 2:
                    await javascriptclickEvents.clickObj(value);
                    expect(await javascriptclickEvents.getValue()).toBe(assertValues.obj2);
                    break;
                case 3:
                    await javascriptclickEvents.clickObj(value);
                    expect(await javascriptclickEvents.getValue()).toBe(assertValues.obj3);
                    break;
                case 4:
                    await javascriptclickEvents.clickObj(value);
                    expect(await javascriptclickEvents.getValue()).toBe(assertValues.obj4);
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