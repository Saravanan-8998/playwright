import { Locator, Page } from "@playwright/test";
import { click } from "../support/utils";

export class BrokenLinks {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async manualDateEnter() {
       
    }

    async manualDateClick() {
        await this.page.locator(this.datePickerLoc).click();
        await this.page.locator(this.nextMonth).click();
        await this.page.locator(this.dateToSelect(date)).click();
        await click(this.page, 'button', 'Submit');
    }

    async datePickerValidation() {
        return await this.page.locator(this.datePickerValue).innerText();
    }
}