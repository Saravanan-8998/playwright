import { Locator, Page, expect } from "@playwright/test";
import Constants from "../support/constants.json";

export default class Accordions {
    readonly page: Page; clickLoc: string; textLoc: string;

    constructor(page: Page) {
        this.page = page;
        this.clickLoc = `//summary[text()='Click to see more']`;
        this.textLoc = `//p[text()='This is an accordion item.']`;
    }

    async clickAcc() {
        await this.page.locator(this.clickLoc).click();
    }

    async verifyAcc() {
        let value = await this.page.locator(this.textLoc).textContent();
        expect(value).toBe(Constants.accordions);
    }
}