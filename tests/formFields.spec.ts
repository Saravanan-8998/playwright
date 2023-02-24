import { expect, test, Page } from "@playwright/test";
import { FormFields } from "../pageObjects/formFields";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let formFields: FormFields;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.formFields);
    formFields = new FormFields(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check all form fields functionality in automatenow sandbox', async () => {
    test('Should submit the form with valid data', async () => {
        await expect(page).toHaveURL(/.*form-fields/);
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

test.afterEach(async () =>{
    await page.close();
});