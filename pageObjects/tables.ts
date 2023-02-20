import { Locator,expect, Page } from "@playwright/test";
import { rollSelect, labelClick, type } from "../support/utils";
import Constants from "../support/constants.json";

export class Tables {
    readonly page: Page; currentValue: string; defaultRankValue: string; defaultSort: string; ascSort: string; descSort: string; searchLoc: string; scrollId: string;

    constructor(page: Page) {
        this.page = page;
        this.currentValue = "#tablepress-1_info";
        this.defaultRankValue = `(//td[@class='column-1'])[1]`;
        this.defaultSort = `//th[@class='column-1 sorting']`;
        this.ascSort = `.sorting_asc`;
        this.descSort = `.sorting_desc`;
        this.searchLoc = `Search:`;
        this.scrollId = `.dataTables_length`;
    }

    async selectOption(value: any) {
        await rollSelect(this.page, 'combobox', 'Show entries', value);
    }

    async getValue() {
        return await this.page.locator(this.currentValue).textContent();
    }

    async getRankValue() {
        return await this.page.locator(this.defaultRankValue).textContent();
    }

    async accendingAssertion() {
        await this.page.locator(this.defaultSort).click();
        await this.page.locator(this.ascSort).click();
        return await this.getRankValue();
    }

    async descendingAssertion() {
        await this.page.locator(this.descSort).click();
        return await this.getRankValue();
    }

    async clickSearchBtn() {
        await labelClick(this.page, this.searchLoc);
    }

    async enterSearch(searchText: string) {
        await type(this.page, this.searchLoc, searchText);
    }

    async scrollDown() {
        await this.page.locator(this.scrollId).scrollIntoViewIfNeeded();
    }

    async searchByValue(value: any) {
        let values = await this.page.$$(`tr:has-text('${value}')`);
        for await (const tableRow of values) {
            let allRowData = await tableRow.innerText();
            expect(allRowData).toContain(Constants.searchValueAssertion);
        }
    }
}