import { expect, test, Page } from "@playwright/test";
import { Tables } from "../pageObjects/tables";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import Constants from "../constants/constants.json";

let page: Page;
let table: Tables;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check all popup functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.popup);
        table = new Tables(page);
    });

    test('Should check alert popup functionality', async () => {
        
    });

    test('Should check confirm popup functionality', async () => {
        
    });

    test('Should check prompt popup functionality', async () => {
        
    });

    test('Should check tooltip functionality', async () => {
        
    });

    test.afterAll(async () => {
        page.close();
    })
});