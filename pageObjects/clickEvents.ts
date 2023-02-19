import { Locator, Page, expect } from "@playwright/test";
import { click } from "../support/utils";

let userObject: any = [];
enum assertValues {
    obj1 = "Meow!",
    obj2 = "Woof!",
    obj3 = "Oink!",
    obj4 = "Moo!",
}

export class ClickEvents {
    readonly page: Page; obj1: string; obj2: string; obj3: string; obj4: string; valueLoc: string;

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
                await click(this.page, 'button', 'Cat');
                break;
            case 2:
                await this.page.waitForSelector(this.obj2);
                await click(this.page, 'button', 'Dog');
                break;
            case 3:
                await this.page.waitForSelector(this.obj3);
                await click(this.page, 'button', 'Pig');
                break;
            case 4:
                await this.page.waitForSelector(this.obj4);
                await click(this.page, 'button', 'Cow');;
                break;
            default:
                console.log("None of the objects are selected");
                break;
        }
    }

    async getValue() {
        return await this.page.locator(this.valueLoc).textContent();
    }

    async clickAllEvents() {
        userObject = [1, 2, 3, 4];
        for (let value of userObject) {
            switch (value) {
                case 1:
                    await this.clickObj(value);
                    expect(await this.getValue()).toBe(assertValues.obj1);
                    break;
                case 2:
                    await this.clickObj(value);
                    expect(await this.getValue()).toBe(assertValues.obj2);
                    break;
                case 3:
                    await this.clickObj(value);
                    expect(await this.getValue()).toBe(assertValues.obj3);
                    break;
                case 4:
                    await this.clickObj(value);
                    expect(await this.getValue()).toBe(assertValues.obj4);
                    break;
                default:
                    console.log("None of the objects are selected");
                    break;
            }
        }
    }
}   