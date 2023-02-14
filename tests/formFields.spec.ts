import { expect, test, Page } from "@playwright/test";
import { FormFields } from "../pageObjects/formFields";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import { Constants } from "../constants/constants";

let page: Page;
let formFields: FormFields;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check all form fields functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.formFields);
        formFields = new FormFields(page);
    });

    test('Should validate the form fields with valid data', async () => {
        await expect(page).toHaveURL(/.*form-fields/);
    });

    test.afterAll(async () => {
        page.close();
    })
});