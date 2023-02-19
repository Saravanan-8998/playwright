import { expect, test, Page } from "@playwright/test";
import { FormFields } from "../pageObjects/formFields";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";

let page: Page;
let formFields: FormFields;

test.describe('Should check all form fields functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.formFields);
        formFields = new FormFields(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    test('Should submit the form with valid data', async () => {
        await formFields.nameInputFunction();
        await formFields.checkBoxInputFunction();
        await formFields.radioInputFunction();
        await formFields.dropDownFunction();
        await formFields.checkTextFunction();
        await formFields.emailFunction();
        await formFields.messageFunction();
        await formFields.submit();
        await formFields.assertionFun();
    });

});