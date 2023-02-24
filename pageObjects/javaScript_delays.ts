import { Locator, Page, expect } from "@playwright/test";
import { click } from "../support/utils";
import Constants from "../support/constants.json";

export class JavaScriptDelays {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnStart() {
        await click(this.page, 'button', 'Start');
    }

    async textValue() {
        let value = await this.page.locator(`#delay`).inputValue();
        expect(value).toBe(Constants.delayVerification);
    }
}   