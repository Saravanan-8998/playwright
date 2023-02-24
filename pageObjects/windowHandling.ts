import { Locator, Page } from "@playwright/test";

export class WindowHandling {
    readonly page: Page; tabcontainer: string; googlesearchbtn: string; replacebtn: string;

    constructor(page: Page) {
        this.page = page;
        this.tabcontainer = "button[onclick='newTab()']";
        this.googlesearchbtn = "//input[@title='Search']";
        this.replacebtn = "button[onclick='newWindowSelf()']";
    }

    async clickNewTab() {
        await this.page.locator(this.tabcontainer).click();
    }

    async clickGoogleSearchBtn() {
        return this.googlesearchbtn;
    }

    async clickreplacebtn() {
        await this.page.locator(this.replacebtn).click();
    }
}