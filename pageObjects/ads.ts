import { Locator, Page, expect } from "@playwright/test";
import Constants from "../support/constants.json";

export class JavaScriptAds {
    readonly page: Page; mainDiv: string; clsDiv: string;

    constructor(page: Page) {
        this.page = page;
        this.mainDiv = "(//div[@class='pum-content popmake-content']//p)[1]";
        this.clsDiv = "(//button[@aria-label='Close'])[1]";
    }

    async textValue() {
        let value = await this.page.locator(this.mainDiv).textContent();
        expect(value).toBe(Constants.adsAssertion);
    }

    async closeDiv() {
        await this.page.locator(this.clsDiv).click();
    }
}   