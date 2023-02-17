import { expect, test, Page } from "@playwright/test";
import { Slider } from "../pageObjects/sliders";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";

let page: Page;

test.describe('Should check slider function in automatenow sandbox', async () => {
    let slider: Slider;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.sliders);
        slider = new Slider(page);
    });

    test('should able to slide and check the target slided count', async ({ page }) => {
        let sliderData = await slider.getSlider();
        let movedValue = await slider.moveSlider(Constants.targetSlider, sliderData);
        let currentSliderValue = await slider.getSliderValue();
        expect(movedValue).toContain(currentSliderValue);
    });

    test.afterAll(async () => {
        page.close();
    })
});