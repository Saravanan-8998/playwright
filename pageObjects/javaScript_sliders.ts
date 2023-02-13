import { Locator, Page } from "@playwright/test";

export class JavaScriptSlider {
    readonly page:Page;
    readonly sliderRange: string;
    readonly sliderId: string;

    constructor(page: Page) {
        this.page = page;
        this.sliderRange = "//input[@type='range']";
        this.sliderId = "//span[@id='value']";
    }

    async getSlider() {
        return this.page.locator(this.sliderRange);
    }
    async getSliderValue() {
        let sliderValue = await this.page.locator(this.sliderId).innerText();
        return sliderValue;
    }
}