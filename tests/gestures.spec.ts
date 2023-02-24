import { expect, test, Page } from "@playwright/test";
import { Gestures } from "../pageObjects/gestures";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let gestures: Gestures;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.gestures);
    gestures = new Gestures(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check all gestures functionality in automatenow sandbox', async () => {
    test('Should drag a component to a destination', async () => {
        await expect(page).toHaveURL(/.*gestures/);
        await gestures.dragElementToFormArea();
    });

    test('Should drag a image from one component to a other component', async () => {
        await expect(page).toHaveURL(/.*gestures/);
        await gestures.dragtheimage();
    });

    test('Should drag the map in the map component', async () => {
        await expect(page).toHaveURL(/.*gestures/);
        await gestures.mapFunctions();
    });
});

test.afterEach(async () =>{
    await page.close();
});