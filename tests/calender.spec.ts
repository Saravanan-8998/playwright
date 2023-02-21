import { expect, test, Page } from "@playwright/test";
import { Calender } from "../pageObjects/calender";
import subURL from "../support/subURL.json";
import moment from "moment";
import Constants from "../support/constants.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let calender: Calender;
let inputDate: string = moment().add(1, 'day').format("MMMM DD, YYYY");

test.beforeAll(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.calender);
    calender = new Calender(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('should check valid date in automatenow sandbox', async () => {

    test('Should check for a valid date of a calendar', async () => {
        await expect(page).toHaveURL(/.*calendars/);
        await calender.manualDateEnter(inputDate);
        expect(await calender.datePickerValidation()).toContain(inputDate);
        await page.goto(subURL.calender);
        await calender.manualDateClick(Constants.date);
        expect(await calender.datePickerValidation()).toContain(Constants.date);
    });
});