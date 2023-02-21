import { Locator, Page, expect } from "@playwright/test";
import { click, labelClick, labelFill } from "../support/utils";
import Constants from "../support/constants.json";

export class Modals {
    readonly page: Page;
    readonly simpleText: string;

    constructor(page: Page) {
        this.page = page;
        this.simpleText = `//p[text()='Hi, I’m a simple modal.']`;
    }

    async clickSimpleModal() {
        await click(this.page, 'button', 'Simple Modal');
        let value = await this.page.locator(this.simpleText).textContent();
        expect(value).toBe(Constants.simpleValue);
    }

    async closeSimpleModal() {
        await click(this.page, 'button', 'Close');
    }

    async clickFormModal() {
        await click(this.page, 'button', 'Form Modal');
    }

    async formFill() {
        await labelClick(this.page, 'Name(required)');
        await labelFill(this.page, 'Name(required)', 'Saravanan');
        await labelClick(this.page, 'Email');
        await labelFill(this.page, 'Email', 'sarava@gmail.com');
        await labelClick(this.page, 'Message');
        await labelFill(this.page, 'Message', 'Testing');
        await click(this.page, 'button', 'Submit');
    }
}   