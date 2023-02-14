import { Locator, Page } from "@playwright/test";

export class Tables {
    readonly page: Page;
    readonly currentValue: string;
    readonly defaultRankValue: string;
    readonly defaultSort: string;
    readonly ascSort: string;
    readonly descSort: string;
    readonly searchLoc: string;
    readonly scrollId: string;

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
        return await this.page.getByRole('combobox', { name: 'Show entries' }).selectOption(value);
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
        await this.page.getByLabel(this.searchLoc).click();
    }

    async enterSearch(searchText: string) {
        await this.page.getByLabel(this.searchLoc).type(searchText);
    }

    async scrollDown() {
        await this.page.locator(this.scrollId).scrollIntoViewIfNeeded();
    }

    async searchByValue(value: any){
        return await this.page.$$(`tr:has-text('${value}')`);
    }
}