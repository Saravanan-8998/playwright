import { expect, test, Page } from "@playwright/test";
import { FileDownload } from "../pageObjects/fileDownload";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let fileDownload: FileDownload;
let page: any;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.fileDownload);
    fileDownload = new FileDownload(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check fileDownload in automatenow sandbox', async () => {

    test('Should check the pdf content and download the pdf', async () => {
        await expect(page).toHaveURL(/.*file-download/);
        await fileDownload.validatePDF();
        await page.close();
    });

    test('Should check the docs content and download the docs', async () => {
        await expect(page).toHaveURL(/.*file-download/);
        await fileDownload.validateDocx();
        await page.close();
    });
});