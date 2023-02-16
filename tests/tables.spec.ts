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
        table = new Tables(page);
    });

    test('Should check the show entries as per the dropdown selection', async () => {
        await expect(page).toHaveURL(/.*tables/);
        let defaultValue = await table.getValue();
        expect(defaultValue).toBe(Constants.tableAssertion1);
        await table.selectOption(dynamicValues.totalTableValue2);
        let currentValue = await table.getValue();
        expect(currentValue).toBe(Constants.tableAssertion2);
    });

    test('Should check the value from the table as per the dropdown selection', async () => {
        let accendingValue = await table.accendingAssertion();
        expect(accendingValue).toBe(Constants.assertionValue);
        let descendingValue = await table.descendingAssertion();
        expect(descendingValue).toBe(Constants.assertionValue1);
    });

    test('Should search a value from search and check that value listed below', async () => {
        await table.scrollDown();
        await table.clickSearchBtn();
        await table.enterSearch(Constants.searchValue);
        const tableRows = await table.searchByValue(Constants.searchValue);
        for await (const tableRow of tableRows) {
            let allRowData = await tableRow.innerText();
            expect(allRowData).toContain(Constants.searchValueAssertion);
        }
    });

    test.afterAll(async () => {
        page.close();
    })
});