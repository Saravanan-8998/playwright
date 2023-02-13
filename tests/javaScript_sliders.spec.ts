import { expect, test, Page } from "@playwright/test";
import { JavaScriptSlider } from "../pageObjects/javaScript_sliders";
import allURL from "../URLs/allURL.json";
import subURL from "../URLs/subURL.json";

let page: Page;

test.use({
    baseURL: allURL.mainURL
});

test.describe('Should check slider function in automatenow sandbox', async () => {
    let javaScriptSlider: JavaScriptSlider;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(subURL.sliders);
        javaScriptSlider = new JavaScriptSlider(page);
    });

    test('should able to slide and check the target slided count', async ({ page }) => {
        let slider = await javaScriptSlider.getSlider();
        let targetSlider = "25";
        let ifDone = false;
        if (slider) {
            while (!ifDone) {
                let sliderBoundingBox = await slider.boundingBox();
                if (sliderBoundingBox) {
                    await page.mouse.move(sliderBoundingBox.x + sliderBoundingBox.width / 2, sliderBoundingBox.y + sliderBoundingBox.height / 2);
                    await page.mouse.down();
                    await page.mouse.move(sliderBoundingBox.x + 567, sliderBoundingBox.y + sliderBoundingBox.height / 2);
                    await page.mouse.up();
                    if (targetSlider) {
                        ifDone = true;
                    }
                }
            }
            await page.waitForTimeout(5000);
            let value = await javaScriptSlider.getSliderValue();
            expect(value).toContain("25");
        }
    });

    test.afterAll(async () => {
        page.close();
    })
});