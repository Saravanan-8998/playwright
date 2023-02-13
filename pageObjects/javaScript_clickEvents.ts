import { Locator, Page } from "@playwright/test";

export class JavaScriptClickEvents {
    readonly page: Page;
    readonly obj1: string;
    readonly obj2: string;
    readonly obj3: string;
    readonly obj4: string;
    readonly valueLoc: string;

    constructor(page: Page) {
        this.page = page;
        this.obj1 = `[onclick="catSound()"]`;
        this.obj2 = `[onclick="dogSound()"]`;
        this.obj3 = `[onclick="pigSound()"]`;
        this.obj4 = `[onclick="cowSound()"]`;
        this.valueLoc = "#demo";
    }

    async clickObj(value: any) {
        switch (value) {
            case 1:
                await this.page.waitForSelector(this.obj1);
                await this.page.getByRole('button', { name: 'Cat' }).click();
                break;
            case 2:
                await this.page.waitForSelector(this.obj2);
                await this.page.getByRole('button', { name: 'Dog' }).click();
                break;
            case 3:
                await this.page.waitForSelector(this.obj3);
                await this.page.getByRole('button', { name: 'Pig' }).click();
                break;
            case 4:
                await this.page.waitForSelector(this.obj4);
                await this.page.getByRole('button', { name: 'Cow' }).click();
                break;
            default:
                console.log("None of the objects are selected");
                break;
        }
    }

    async getValue() {
        return await this.page.locator(this.valueLoc).textContent();
    }
}   