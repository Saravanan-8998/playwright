import { expect, test, Page } from "@playwright/test";
import { JavaScriptTables } from "../pageObjects/javaScript_tables";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import { Constants } from "../constants/constants";

let page: Page;
let javascriptTable: JavaScriptTables;

test.use({
    baseURL: allURL.mainURL
});

enum dynamicValues {
    totalTableValue1 = "10",
    totalTableValue2 = "25",
    totalTableValue3 = "50",
    totalTableValue4 = "100",
}

test.describe('Should check all table functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.tables);
        javascriptTable = new JavaScriptTables(page);
    });

    test('Should check the show entries as per the dropdown selection', async () => {
        let defaultValue = await javascriptTable.getValue();
        expect(defaultValue).toBe(Constants.tableAssertion1);
        await javascriptTable.selectOption(dynamicValues.totalTableValue2);
        let currentValue = await javascriptTable.getValue();
        expect(currentValue).toBe(Constants.tableAssertion2);
    });

    test('Should check the value from the table as per the dropdown selection', async () => {
        let accendingValue = await javascriptTable.accendingAssertion();
        expect(accendingValue).toBe(Constants.assertionValue);
        let descendingValue = await javascriptTable.descendingAssertion();
        expect(descendingValue).toBe(Constants.assertionValue1);
    });

    test('Should search a value from search and check that value listed below', async () => {
        await javascriptTable.scrollDown();
        await javascriptTable.clickSearchBtn();
        await javascriptTable.enterSearch(Constants.searchValue);
        const tableRows = await javascriptTable.searchByValue(Constants.searchValue);
        for await (const tableRow of tableRows) {
            let allRowData = await tableRow.innerText();
            expect(allRowData).toContain(Constants.searchValueAssertion);
        }
    });

    test.afterAll(async () => {
        page.close();
    })
});