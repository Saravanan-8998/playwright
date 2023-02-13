import { Locator, Page } from "@playwright/test";

export default class JavaScriptAds {
    readonly page: Page;
    readonly mainDiv: string;
    readonly clsDiv: string;

    constructor(page: Page) {
        this.page = page;
        this.mainDiv = "(//div[@class='pum-content popmake-content']//p)[1]";
        this.clsDiv = "(//button[@aria-label='Close'])[1]";
    }

    async textValue() {
        return await this.page.locator(this.mainDiv).textContent();
    }

    async closeDiv() {
        await this.page.locator(this.clsDiv).click();
    }
}   