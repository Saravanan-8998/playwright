import { expect, Locator, Page } from "@playwright/test";
import Constants from "../support/constants.json";

export class Carousel {
    readonly page: Page; brokenImg: string; imgGallery1: string; imgGallery2: string; imgGallery3: string; imgGallery4: string; imgGallery5: string;

    constructor(page: Page) {
        this.page = page;
        this.brokenImg = `.icon.icon-generic`;
        this.imgGallery1 = `(//img[@data-id='4379'])[1]`;
        this.imgGallery2 = `(//img[@data-id='4374'])[1]`;
        this.imgGallery3 = `(//img[@data-id='4722'])[1]`;
        this.imgGallery4 = `(//img[@data-id='4414'])[2]`;
        this.imgGallery5 = `(//img[@data-id='4421'])[2]`;
    }

    async checkAllCarouselFunctionality() {
        let value1 = await this.page.locator(this.imgGallery1).getAttribute('alt');
        expect(value1).toBe(Constants.carouselImg1);
        let value2 = await this.page.locator(this.imgGallery2).getAttribute('alt');
        expect(value2).toBe(Constants.carouselImg2);
        let value3 = await this.page.locator(this.imgGallery3).getAttribute('alt');
        expect(value3).toBe(Constants.carouselImg3);
        let value4 = await this.page.locator(this.imgGallery4).getAttribute('alt');
        expect(value4).toBe(Constants.carouselImg4);
        let value5 = await this.page.locator(this.imgGallery5).getAttribute('alt');
        expect(value5).toBe(Constants.carouselImg5);
    }
}