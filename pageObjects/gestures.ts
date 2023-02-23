import { expect, Locator, Page } from "@playwright/test";

export class Gestures {
    readonly page: Page; destination: string; boxLoc: string; div1: string; div2: string; sourceImgLoc: string; zoomIn: string; zoomOut: string; fullScr: string;

    constructor(page: Page) {
        this.page = page;
        this.destination = ".wp-block-spacer";
        this.boxLoc = "//div[text()='You can move me around']";
        this.div1 = "//div[@id='div1']";
        this.div2 = "//div[@id='div2']";
        this.sourceImgLoc = "div#div1 img";
        this.zoomIn = "//button[@aria-label='Zoom in']//span[1]";
        this.zoomOut = "//button[@aria-label='Zoom out']//span[1]";
        this.fullScr = "//button[@title='Enter fullscreen']//span[1]";
    }

    async dragBox(width: any, height: any) {
        await this.page.locator(this.boxLoc).hover();
        await this.page.mouse.down();
        await this.page.mouse.move(width, height);
        await this.page.mouse.up();
    }

    async dragElementToFormArea() {
        let destinationLoc = this.page.locator(this.destination).first();
        const targetBound = await destinationLoc.boundingBox();
        let dragWidth: any = targetBound?.width;
        await this.dragBox(dragWidth / 2, targetBound?.height);
    }

    async dragtheimage() {
        await this.page.locator(this.sourceImgLoc).click();
        await this.page.dragAndDrop(this.div1, this.div2);
        await this.page.mouse.up();
    }

    async mapFunctions() {
        await this.page.locator(this.zoomIn).click();
        await this.page.locator(this.zoomOut).click();
        await this.page.keyboard.press('Escape');
    }
}