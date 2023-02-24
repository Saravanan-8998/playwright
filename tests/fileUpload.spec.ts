import { expect, test, Page } from "@playwright/test";
import { FileUpload } from "../pageObjects/fileUpload";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";

let fileUpload: FileUpload;
let page: any;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.fileUpload);
    fileUpload = new FileUpload(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check file Upload in automatenow sandbox', async () => {
    test('Should upload a document and verify whether the document is uploaded', async () => {
        await expect(page).toHaveURL(/.*file-upload/);
        await fileUpload.fileUploadAndVerify();
    });
});

test.afterEach(async () =>{
    await page.close();
});