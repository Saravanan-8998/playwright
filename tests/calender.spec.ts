import { expect, test, Page } from "@playwright/test";
import { Calender } from "../pageObjects/calender";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";
import moment from "moment";

let page: Page;
let calender: Calender;
let inputDate: string = moment().add(1, 'day').format("MMMM DD, YYYY");

test.use({
    baseURL: allURL.mainURL
});

test.describe('should check valid date in automatenow sandbox', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.calender);
        calender = new Calender(page);
    });

    test('Should check for a valid date of a calendar', async () => {
        await calender.datePickerFunction(inputDate);
        await calender.submit();
        expect(await calender.datePickerValidation()).toContain(inputDate);
    });

    test.afterAll(async () => {
        page.close();
    })
});