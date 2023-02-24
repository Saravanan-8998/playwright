import { expect, test, Page } from "@playwright/test";
import { Slider } from "../pageObjects/sliders";
import subURL from "../support/subURL.json";
import Constants from "../support/constants.json";
import { myBrowserFixture } from "../support/fixtures";

let page: Page;
let slider: Slider;

test.beforeEach(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.sliders);
    slider = new Slider(page);
    const title = await page.title();
    console.log(`Page title: ${title}`);
});

test.describe('Should check slider function in automatenow sandbox', async () => {
    test('should able to slide and check the target slided count', async () => {
        let sliderData = await slider.getSlider();
        let movedValue = await slider.moveSlider(Constants.targetSlider, sliderData);
        let currentSliderValue = await slider.getSliderValue();
        expect(movedValue).toContain(currentSliderValue);
    });
});

test.afterEach(async () => {
    await page.close();
});