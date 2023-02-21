import { Locator, Page, expect } from "@playwright/test";
import Constants from "../support/constants.json";

export class FileUpload {
    readonly page: Page; fileUploadLoc: string; submit: string; uploadMsg: string; input: any;

    constructor(page: Page) {
        this.page = page;
        this.fileUploadLoc = `input[type=file]`;
        this.submit = `input[type='submit']`;
        this.uploadMsg = `//div[text()='File upload complete']`;
    }

    async fileUploadAndVerify() {
        this.input = await this.page.$(this.fileUploadLoc);
        await this.input.setInputFiles('support/test.pdf');
        let value = await this.page.locator(this.fileUploadLoc).inputValue();
        expect(value).toContain(Constants.fileUploadName);
        await this.page.waitForSelector(this.submit);
        await this.page.locator(this.submit).click();
        let uploadvalue = await this.page.locator(this.uploadMsg).textContent();
        expect(uploadvalue).toContain(Constants.fileUploadMsg);
    }   
}   