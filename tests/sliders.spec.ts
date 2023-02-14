import { expect, test, Page } from "@playwright/test";
import { Slider } from "../pageObjects/sliders";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";

let page: Page;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check slider function in automatenow sandbox', async () => {
    let slider: Slider;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.sliders);
        slider = new Slider(page);
    });

    test('should able to slide and check the target slided count', async ({ page }) => {
        let sliderData   = await slider.getSlider();
        let targetSlider = "25";
        let ifDone = false;
        if (slider) {
            while (!ifDone) {
                let sliderDimentions = await sliderData.boundingBox();
                if (sliderDimentions) {
                    await page.mouse.move(sliderDimentions.x + sliderDimentions.width / 2, sliderDimentions.y + sliderDimentions.height / 2);
                    await page.mouse.down();
                    await page.mouse.move(sliderDimentions.x + 567, sliderDimentions.y + sliderDimentions.height / 2);
                    await page.mouse.up();
                    if (targetSlider) {
                        ifDone = true;
                    }
                }
            }
            await page.waitForTimeout(5000);
            let value = await slider.getSliderValue();
            expect(value).toContain("25");
        }
    });

    test.afterAll(async () => {
        page.close();
    })
});