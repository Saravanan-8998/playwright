import { Locator, Page, expect } from "@playwright/test";
import Constants from "../support/constants.json";

export default class JavaScriptAds {
    readonly page: Page;
    readonly hoverLoc: string;

    constructor(page: Page) {
        this.page = page;
        this.hoverLoc = "#mouse_over";
    }

    async hoverAndGetTextValue() {
        await this.page.waitForSelector(this.hoverLoc);
        const defaultText = await this.page.locator(this.hoverLoc).textContent();
        expect(defaultText).toBe(Constants.defaultHoverExpect);
        await this.page.locator(this.hoverLoc).hover();
        const changedText = await this.page.locator(this.hoverLoc).textContent();
        expect(changedText).toBe(Constants.hoverExpect);
    }
}   