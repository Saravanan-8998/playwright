import { Locator, Page, expect } from "@playwright/test";

export default class Iframes {
    readonly page: Page; parentFrame: string; childFrame: string; nglogin: string; emailinputbox: string; btnsubmmit: string; fname: string; lname: string; password: string; ngmenu: string; menutext: string; animalpagetitle: string; newsletter: string; newslettertitle: string; ngsearch: string; ngsearchinput: string; valueContainer: string; valueSearch: string;

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
        this.ngmenu = "//button[@aria-label='Menu']";
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
        return parentFrame.frameLocator(this.childFrame);
    }

    async login() {
        let parentFrame = await this.parentFrameElement();
        await parentFrame.locator(this.nglogin).click();
    }

    async menuSelect() {
        let parentFrame = await this.parentFrameElement();
        await parentFrame.locator(this.ngmenu).click();
        await parentFrame.locator(this.menutext).click();
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
        await this.page.reload();
        await this.login();
        await this.page.reload();
        await this.searchSelect();
        await this.page.reload();
        await this.newsSelect();
        await this.page.reload();
        await this.menuSelect();
    }
}