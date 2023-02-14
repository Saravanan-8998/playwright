import { Locator, Page } from "@playwright/test";

export class Calender {
    readonly page: Page;
    readonly datePickerLoc: string;
    readonly datePickerValue: string;

    constructor(page: Page) {
        this.page = page;
        this.datePickerLoc = `input.date.jp-contact-form-date`;
        this.datePickerValue = `//div[@class='field-value']`;
    }

    async datePickerFunction(date: any) {
        await this.page.locator(this.datePickerLoc).click();
        await this.page.locator(this.datePickerLoc).type(date);
        await this.page.locator(this.datePickerLoc).press("Tab");
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async datePickerValidation() {
        return await this.page.locator(this.datePickerValue).innerText();
    }
}
