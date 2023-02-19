import { Locator, Page } from "@playwright/test";

export class Slider {
    readonly page: Page; sliderRange: string; sliderId: string;

    constructor(page: Page) {
        this.page = page;
        this.sliderRange = "//input[@type='range']";
        this.sliderId = "//span[@id='value']";
    }

    async getSlider() {
        return this.page.locator(this.sliderRange);
    }

    async getSliderValue() {
        return await this.page.locator(this.sliderId).innerText();
    }

    async moveSlider(slider: any, sliderData: any) {
        if (slider != this.getSliderValue()) {
            let sliderDimentions = await sliderData.boundingBox();
            await this.page.waitForTimeout(5000);
            await this.page.mouse.move(sliderDimentions.x + sliderDimentions.width / 2, sliderDimentions.y + sliderDimentions.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(sliderDimentions.x + 567, sliderDimentions.y + sliderDimentions.height / 2);
            await this.page.mouse.up();
            slider = await this.getSliderValue();
        }
        return slider;
    }
}
