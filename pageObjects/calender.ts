import { Locator, Page } from "@playwright/test";
import { click } from "../support/utils";

export class Calender {
    readonly page: Page; datePickerLoc: string; datePickerValue: string; nextMonth: string; dateToSelect: any;

    constructor(page: Page) {
        this.page = page;
        this.datePickerLoc = `input.date.jp-contact-form-date`;
        this.datePickerValue = `//div[@class='field-value']`;
        this.nextMonth = `//a[@title='Next']`;
        this.dateToSelect = (date: any) => {
            return `//a[text()='${date}']`;
        }
    }

    async manualDateEnter(date: any) {
        await this.page.locator(this.datePickerLoc).click();
        await this.page.locator(this.datePickerLoc).type(date);
        await this.page.locator(this.datePickerLoc).press("Tab");
        await click(this.page, 'button', 'Submit');
    }

    async manualDateClick(date: any) {
        await this.page.locator(this.datePickerLoc).click();
        await this.page.locator(this.nextMonth).click();
        await this.page.locator(this.dateToSelect(date)).click();
        await click(this.page, 'button', 'Submit');
    }

    async datePickerValidation() {
        return await this.page.locator(this.datePickerValue).innerText();
    }
}
