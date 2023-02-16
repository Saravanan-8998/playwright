import { Locator, Page } from "@playwright/test";

export class FormFields {
    readonly page: Page;
    readonly alertPopupBtn: string;
    readonly confirmPopupBtn: string;
    readonly promptPopupBtn: string;

    constructor(page: Page) {
        this.page = page;
        this.alertPopupBtn = `//b[text()='Alert Popup']`;
        this.confirmPopupBtn = `//b[text()='Confirm Popup']`;
        this.promptPopupBtn = `//b[text()='Prompt Popup']`;
    }

    async alertPopup(){
        await this.page.locator(this.alertPopupBtn).clear();
        
    }
}
