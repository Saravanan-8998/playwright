import { Page, expect, request, APIRequestContext } from "@playwright/test";
import { Constants } from "../constants/constants";

export class BrokenImages {
    readonly page: Page;
    readonly imgLoc: string;
    readonly image1: any;
    readonly image2: any;
    readonly image3: any;

    constructor(page: Page) {
        this.page = page;
        this.imgLoc = `//div[@class='wp-block-columns is-layout-flex wp-container-4']//div[@class='wp-block-column is-layout-flow']//img`;
        this.image1 = this.page.locator(`//img[@alt='JavaScript Logo | JavaScript Language Logo | JavaScript']`);
        this.image2 = this.page.locator(`//img[@alt='Broken Image 1']`);
        this.image3 = this.page.locator(`//img[@alt='Broken Image 2']`);
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

    async conditionAPI(request: APIRequestContext) {
        for (const image of await this.getImageURL()) {
            const imageResult = await request.get(image);
            if (imageResult.status() == Constants.statusCode200) {
                expect(imageResult.body).toBeTruthy();
            }
            else {
                expect(imageResult.status()).toBeGreaterThanOrEqual(Constants.statusCode400);
            }
        }
    }

    async properImage() {
        const alt1 = await this.image1.getAttribute('alt');
        const alt2 = await this.image2.getAttribute('alt');
        const alt3 = await this.image3.getAttribute('alt');
        const allAlt = [await alt1, await alt2, await alt3];
        return allAlt;
    }

    async conditionAlt() {
        let eachImage = await this.properImage();
        for (const each of eachImage) {
            if (await each === Constants.JavaScriptLogo) {
                expect(each).toContain(Constants.JavaScriptLogo);
            }
            else {
                console.log("Image is broken");
            }
        }
    }
}
