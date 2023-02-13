import { Locator, Page } from "@playwright/test";

export default class JavaScriptDelays {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnStart(): Promise<void> {
        return await this.page.getByRole('button', { name: 'Start' }).click();
    }

    async textValue() {
        let valueOfText = await this.page.locator(`#delay`).inputValue();
        return valueOfText;
    }
}   