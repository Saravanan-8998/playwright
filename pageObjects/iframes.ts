import { Locator, Page, expect } from "@playwright/test";
import Constants from "../support/constants.json";

export default class Iframes {
    readonly page: Page; parentFrame: string; childFrame: string; nglogin: string; emailinputbox: string; btnsubmmit: string; fname: string; lname: string; password: string; ngmenu: string; menutext: string; animalpagetitle: string; newsletter: string; newslettertitle: string; ngsearch: string; ngsearchinput: string; valueContainer: string;
    readonly valueSearch: string;

    constructor(page: Page) {
        this.page = page;
        this.parentFrame = '#frame2';
        this.childFrame = '#oneid-iframe[title="Account"]';
        this.emailinputbox = '#InputIdentityFlowValue';
        this.nglogin = "text=Login";
        this.btnsubmmit = "#BtnSubmit";
        this.fname = '#InputFirstName';
        this.lname = '#InputLastName';
        this.password = '#password-new';
        this.ngmenu = ".Button.Button--default.Button--icon";
        this.menutext = "//a[@class='AnchorLink MenuModal__Content__List__Item--primarylink'][text()='Animals']";
        this.animalpagetitle = '.BannerHeading__Title h1';
        this.newsletter = "//a[text()='Newsletters']";
        this.newslettertitle = "//h1[@class='NewsletterSignup__Title']";
        this.ngsearch = "//a[@aria-label='Search']";
        this.valueContainer = '.AnchorLink.ResultCard__Link';
        this.valueSearch = `.TermList__Item`;
    }

    async parentFrameElement() {
        return this.page.frameLocator(this.parentFrame);
    }

    async childFrameElement() {
        let parentFrame = await this.parentFrameElement();
        const childFrame = parentFrame.frameLocator(this.childFrame);
        return childFrame;
    }

    async login() {
        await this.page.reload();
        let parentFrame = await this.parentFrameElement();
        await parentFrame.locator(this.nglogin).click();
    }

    // async subscribe() {
    //     await this.page.waitForTimeout(10000);
    //     let childFrame = await this.childFrameElement();
    //     await childFrame.locator(this.emailinputbox).fill(Constants.email);
    //     await childFrame.locator(this.btnsubmmit).click();
    //     await childFrame.locator(this.fname).fill(Constants.Fname);
    //     await childFrame.locator(this.lname).fill(Constants.Lname);
    //     await childFrame.locator(this.password).fill(Constants.Password);
    //     await childFrame.locator(this.btnsubmmit).click();
    // }

    async menuSelect() {
        let parentFrame = await this.parentFrameElement();
        await this.page.locator(this.ngmenu).click();
        await this.page.locator(this.menutext).click();
        const animalTitle = await parentFrame.locator(this.animalpagetitle).textContent();
        expect(animalTitle).toEqual("Animals");
    }

    async newsSelect() {
        let parentFrame = await this.parentFrameElement();
        await parentFrame.locator(this.newsletter).click();
        const newslettertitle = await parentFrame.locator(this.newslettertitle).textContent();
        expect(newslettertitle).toEqual("Sign Up for National Geographic Newsletters");
    }

    async searchSelect() {
        let parentFrame = await this.parentFrameElement();
        await parentFrame.locator(this.ngsearch).click();
        await this.page.waitForTimeout(4000);
        await parentFrame.locator(this.valueSearch).first().click();
        await parentFrame.locator(this.valueContainer).first().isVisible();
    }

    async mainFunction() {
        await this.page.waitForTimeout(6000);
        await this.login();
        // await this.page.waitForTimeout(6000);
        // await this.subscribe();
        await this.page.waitForTimeout(6000);
        await this.menuSelect();
        await this.page.waitForTimeout(6000);
        await this.newsSelect();
        await this.page.waitForTimeout(6000);
        await this.searchSelect();
    }
}