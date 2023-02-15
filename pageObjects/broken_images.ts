import { Page } from "@playwright/test";

export class BrokenImages {
    readonly page: Page;
    readonly imgLoc: string;

    constructor(page: Page) {
        this.page = page;
        this.imgLoc = `//div[@class='wp-block-columns is-layout-flex wp-container-4']//div[@class='wp-block-column is-layout-flow']//img`;
    }

    async getImageURL() {
        let images: string[] = await this.page.$$eval<string[], HTMLImageElement>(this.imgLoc, async (imageElementsArray) => {
            let imageURLs: string[] = new Array();
            for await (const imageElement of imageElementsArray) {
                imageURLs.push(imageElement.src);
            }
            return imageURLs;
        });
        return images;
    }
}
