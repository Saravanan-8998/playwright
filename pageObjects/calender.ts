import { Locator, Page } from "@playwright/test";

export class Calender {
    readonly page: Page;
    readonly datePickerLoc: string;
    readonly datePickerValue: string;
    readonly nextMonth: string;
    readonly dateToSelect: any;

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
        await this.submit();
    }

    async manualDateClick(date:any) {
        await this.page.locator(this.datePickerLoc).click();
        await this.page.locator(this.nextMonth).click();
        await this.page.locator(this.dateToSelect(date)).click();
        await this.submit();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async datePickerValidation() {
        return await this.page.locator(this.datePickerValue).innerText();
    }
}
