import { Locator, Page, expect } from "@playwright/test";
import { rollTrue } from "../support/utils";
import Constants from "../support/constants.json";

export class FileDownload {
    readonly page: Page; mainPdf: string; mainDoc: string; textLoc: string; frameLoc: string;

    constructor(page: Page) {
        this.page = page;
        this.mainPdf = `//a[contains(text(),'Sandbox Download Form - .pdf')]`;
        this.mainDoc = `//a[contains(text(),'Sandbox Download Form - .docx')]`;
        this.textLoc = `.mt-0`;
        this.frameLoc = `#wpdm-lock-frame`;
    }

    async validatePDF() {
        await this.page.locator(this.mainPdf).click();
        await expect(this.page).toHaveURL(/.*download-file/);
        let value = await this.page.locator(this.textLoc).textContent();
        expect(value).toBe(Constants.pdfText);
        await rollTrue(this.page, 'link', 'Download');
    }

    async validateDocx() {
        await this.page.locator(this.mainDoc).click();
        await expect(this.page).toHaveURL(/.*file-download-form/);
        let value = await this.page.locator(this.textLoc).textContent();
        expect(value).toBe(Constants.docxText);
        await rollTrue(this.page, 'link', 'Download');
        await this.page.waitForTimeout(3000);
        await this.page.frameLocator(this.frameLoc).getByPlaceholder('Enter Password').fill(Constants.docxPassword);
        await this.page.frameLocator(this.frameLoc).getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForEvent('download')
    }
}   