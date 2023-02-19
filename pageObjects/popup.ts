import { expect, Locator, Page } from "@playwright/test";
import Constants from "../support/constants.json";
import { click } from "../support/utils";

export class Popups {
    readonly page: Page; confirmResult: string; promptResult: string; toolTipLoc: string; toolTipPopup: string;

    constructor(page: Page) {
        this.page = page;
        this.confirmResult = "#confirmResult";
        this.promptResult = "#promptResult";
        this.toolTipLoc = `.tooltip_1`;
        this.toolTipPopup = `.tooltip_text.show`;
    }

    async alertAccept() {
        await click(this.page, 'button', 'Alert Popup');
        this.page.on('dialog', dialog => { dialog.accept(); });
    }

    async alertMsg() {
        await click(this.page, 'button', 'Alert Popup');
        this.page.on('dialog', dialog => { expect(dialog.message()).toEqual(Constants.alertMsg); });
    }

    async alertConfirmAccept() {
        await click(this.page, 'button', 'Confirm Popup');
        this.page.on('dialog', dialog => { dialog.accept(); });
        let afterDeclineMsg = await this.page.locator(this.confirmResult).textContent();
        expect(afterDeclineMsg).toBe(Constants.afterDeclineMsg);
    }

    async alertConfirmMsg() {
        await click(this.page, 'button', 'Confirm Popup');
        this.page.on('dialog', dialog => { expect(dialog.message()).toEqual(Constants.alertConfirmMsg); });
    }

    async alertConfirmDecline() {
        await click(this.page, 'button', 'Confirm Popup');
        this.page.on('dialog', dialog => { dialog.dismiss(); });
        let afterAcceptMsg = await this.page.locator(this.confirmResult).textContent();
        expect(afterAcceptMsg).toBe(Constants.afterAcceptMsg);
    }

    async alertPromptAccept() {
        await click(this.page, 'button', 'Prompt Popup');
        this.page.on('dialog', dialog => { dialog.accept(); });
        let afterPromptDeclineMsg = await this.page.locator(this.promptResult).textContent();
        expect(afterPromptDeclineMsg).toBe(Constants.afterPromptDeclineMsg);
    }

    async alertPromptMsg() {
        await click(this.page, 'button', 'Prompt Popup');
        this.page.on('dialog', dialog => { expect(dialog.message()).toEqual(Constants.alertPromptMsg); });
    }

    async alertPromptDecline() {
        await click(this.page, 'button', 'Prompt Popup');
        this.page.on('dialog', dialog => { dialog.dismiss(); });
        let afterPromptAcceptMsg = await this.page.locator(this.promptResult).textContent();
        expect(afterPromptAcceptMsg).toBe(Constants.afterPromptDeclineMsg);
    }

    async toolTip() {
        await this.page.locator(this.toolTipLoc).click();
        let tooltipValue = await this.page.locator(this.toolTipPopup).textContent();
        expect(tooltipValue).toBe(Constants.tooltipMsg);
    }
}