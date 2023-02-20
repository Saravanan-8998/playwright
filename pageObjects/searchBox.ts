import { expect, Locator, Page } from "@playwright/test";

export class SearchBox {
    readonly page: Page;
    readonly searchInput: string;
    readonly searchBtn: string;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = `(//input[@name='s'])[1]`;
        this.searchBtn = `(//button[@type='submit'])[1]`;
    }

    async searchWithValue(value: any) {
        await this.page.locator(this.searchInput).fill(value);
    }

    async search() {
        await this.page.locator(this.searchBtn).click();
        await expect(this.page).toHaveURL(/.*?s=/);
    }
}
