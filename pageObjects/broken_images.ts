import { Page, expect, request, APIRequestContext } from "@playwright/test";
import Constants from "../support/constants.json";

export class BrokenImages {
    readonly page: Page; imgLoc: string; image1: any; image2: any; image3: any; imageURL1: any; imageURL2: any; imageURL3: any;

    constructor(page: Page) {
        this.page = page;
        this.imgLoc = `//div[@class='wp-block-columns is-layout-flex wp-container-4']//div[@class='wp-block-column is-layout-flow']//img`;
        this.image1 = this.page.locator(`//img[@alt='JavaScript Logo | JavaScript Language Logo | JavaScript']`);
        this.image2 = this.page.locator(`//img[@alt='Broken Image 1']`);
        this.image3 = this.page.locator(`//img[@alt='Broken Image 2']`);
        this.imageURL1 = `https://i0.wp.com/automatenow.io/wp-content/uploads/2022/02/javascript-logo.jpg?resize=169%2C169&ssl=`;
        this.imageURL2 = `https://automatenow.io/sandbox-automation-testing-practice-website/broken-images/1.jpg`;
        this.imageURL3 = `https://automatenow.io/sandbox-automation-testing-practice-website/broken-images/2.jpg`;
    }

    async conditionAPI(request: APIRequestContext) {
        let allImageURL = [await this.imageURL1, await this.imageURL2, await this.imageURL3];
        for (const image of allImageURL) {
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