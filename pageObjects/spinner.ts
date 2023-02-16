import { Locator, Page } from "@playwright/test";

export class Spinners {
    readonly page: Page;
    readonly spinnerLoc: string;
    readonly textLoc: string;

    constructor(page: Page) {
        this.page = page;
        this.spinnerLoc = `//div[@class='spinner']`;
        this.textLoc = `//div[@class='entry-content']//p[1]`;
    }

    async spinnerAppeared(){
        await this.page.pause();
        await this.page.locator(this.spinnerLoc).isVisible();
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.spinnerLoc).isHidden();
    }

    async textAppeared(){
        await this.page.locator(this.textLoc).isVisible();
        return await this.page.locator(this.textLoc).innerText();
    }
}
