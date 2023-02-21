import { expect, test, Page } from "@playwright/test";
import { SearchBox } from "../pageObjects/searchBox";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";
import Constants from "../support/constants.json";

let page: Page;

test.describe('Should check javascript searchBox in automatenow sandbox', async () => {
    let searchBox: SearchBox;

    test.beforeAll(async () => {
        page = (await myBrowserFixture()).page;
        await page.goto(subURL.search_box);
        searchBox = new SearchBox(page);
        const title = await page.title();
        console.log(`Page title: ${title}`);
    });

    Constants.searchBoxValue.forEach(option => {
        test(`Searching with ${option.searchValue}`, async () => {
            await expect(page).toHaveURL(/.*search-box/);
            await searchBox.searchWithValue(`${option.searchValue}`);
            await searchBox.search();
            await page.goBack();
            await page.reload();
        });
    });
});