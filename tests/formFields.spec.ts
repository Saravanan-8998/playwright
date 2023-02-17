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
    });

    test('Should check the responce with data entered', async () => {
        expect(await formFields.headerValueValidation()).toBe(Constants.headerValue);
        expect(await formFields.nameValueValidation()).toBe(Constants.nameValue);
        expect(await formFields.checkBoxValueValidation()).toBe(Constants.checkBoxValue);
        expect(await formFields.radioValueValidation()).toBe(Constants.radioValue);
        expect(await formFields.dropDownValueValidation()).toBe(Constants.dropDownValue);
        expect(await formFields.emailValueValidation()).toBe(Constants.emailValue);
        expect(await formFields.messageValueValidation()).toBe(Constants.messageValue);
    });

    test.afterAll(async () => {
        page.close();
    })
});