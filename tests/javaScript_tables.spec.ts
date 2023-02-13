import { expect, test, Page } from "@playwright/test";
import { JavaScriptTables } from "../pageObjects/javaScript_tables";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import hardCode from "../allAssertions/hardCodeAssertions.json";

let page: Page;
let javascriptTable: JavaScriptTables;

test.use({
    baseURL: allURL.mainURL
});

enum dynamicValues {
    totalTableValue1 = 10,
    totalTableValue2 = 25,
    totalTableValue3 = 50,
    totalTableValue4 = 100,
}

test.describe('Should check all table functionality in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.tables);
        javascriptTable = new JavaScriptTables(page);
    });

    test('Should check the show entries as per the dropdown selection', async () => {
        let defaultValue = await javascriptTable.getValue();
        expect(defaultValue).toBe(hardCode.value2);
        await javascriptTable.selectOption('25');
        let currentValue = await javascriptTable.getValue();
        expect(currentValue).toBe(hardCode.value3);
    });

    test('Should check the value from the table as per the dropdown selection', async () => {
        let accendingValue = await javascriptTable.accendingAssertion();
        expect(accendingValue).toBe(hardCode.value4);
        let descendingValue = await javascriptTable.descendingAssertion();
        expect(descendingValue).toBe(hardCode.value5);
    });

    test('Should search a value from search and check that value listed below', async () => {
        await javascriptTable.scrollDown();
        await javascriptTable.clickSearchBtn();
        await javascriptTable.enterSearch(hardCode.value6);
        const tableRows = await page.$$('tr:has-text("Ind")');
        for await (const tableRow of tableRows) {
            let allRowData = await tableRow.innerText();
            expect(allRowData).toContain("Ind");
        }
    });

    test.afterAll(async () => {
        page.close();
    })
});