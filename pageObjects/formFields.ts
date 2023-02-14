import { Locator, Page } from "@playwright/test";

export class FormFields {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}