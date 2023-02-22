import {expect,  Locator, Page } from "@playwright/test";
import { click } from "../support/utils";

export class BrokenLinks {
    readonly page: Page; brokenImg: string;

    constructor(page: Page) {
        this.page = page;
        this.brokenImg = `.icon.icon-generic`;
    }

    async clickBrokenLink() {
        await click(this.page, 'link', 'Click me');
    }

    async checkPage(){
        await expect(this.page).toHaveURL(/.*/);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.brokenImg).isVisible();
    }
}