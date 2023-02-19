import { Locator, Page } from "@playwright/test";
import { click } from "../support/utils";

export default class JavaScriptDelays {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnStart() {
        await click(this.page, 'button', 'Start');
    }

    async textValue() {
        return await this.page.locator(`#delay`).inputValue();
    }
}   