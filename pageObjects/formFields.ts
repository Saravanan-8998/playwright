import { Locator, Page } from "@playwright/test";

export class FormFields {
    readonly page: Page;
    readonly nameLoc: string;
    readonly nameInput: string;
    readonly checkBoxLoc: string;
    readonly radioLoc: string;
    readonly dropDownLoc: string;
    readonly emailLoc: string;
    readonly messageLoc: string;
    readonly dropDownYes: string;
    readonly dropDownNo: string;
    readonly headerValidation: string;
    readonly nameValidation: string;
    readonly checkBoxValidation: string;
    readonly radioValidation: string;
    readonly dropDownValidation: string;
    readonly emailValidation: string;
    readonly messageValidation: string;

    constructor(page: Page) {
        this.page = page;
        this.nameLoc = `(//label[text()='Name'])[1]`;
        this.nameInput = `(//input[contains(@class,'name ')])[1]`;
        this.checkBoxLoc = `//label[text()='What is your favorite drink?']`;
        this.radioLoc = `//label[text()='What is your favorite color?']`;
        this.dropDownLoc = `.ui-selectmenu-text`;
        this.dropDownYes = `//div[text()='Yes']`;
        this.dropDownNo = `//div[text()='No']`;
        this.emailLoc = `(//label[text()='Email'])[1]`;
        this.messageLoc = `(//label[text()='Message'])[1]`;
        this.headerValidation = `#contact-form-success-header`;
        this.nameValidation = `//div[text()='Saravanan']`;
        this.checkBoxValidation = `//div[text()='Water']`;
        this.radioValidation = `(//div[@class='field-value'])[3]`;
        this.dropDownValidation = `//div[text()='No']`;
        this.emailValidation = `//div[text()='sarf@gmail.com']`;
        this.messageValidation = `//div[text()='Testing']`;
    }

    async nameInputFunction() {
        await this.page.waitForSelector(this.nameLoc);
        await this.page.waitForSelector(this.nameInput);
        await this.page.getByLabel('Name(required)').isVisible();
        await this.page.getByLabel('Name(required)').fill('Saravanan');
    }

    async checkBoxInputFunction() {
        await this.page.waitForSelector(this.checkBoxLoc);
        await this.selectAllCheckBoxValue();
        await this.deSelectAllCheckBoxValue();
        await this.page.getByText('Water').click();
    }

    async selectAllCheckBoxValue() {
        await this.page.getByText('Water').click();
        await this.page.getByText('Milk').click();
        await this.page.getByText('Coffee').click();
        await this.page.getByText('Wine').click();
    }

    async deSelectAllCheckBoxValue() {
        await this.page.getByText('Water').uncheck();
        await this.page.getByText('Milk').uncheck();
        await this.page.getByText('Coffee').uncheck();
        await this.page.getByText('Wine').uncheck();
    }

    async radioInputFunction() {
        await this.page.waitForSelector(this.radioLoc);
        await this.page.getByText('Red', { exact: true }).click();
        await this.page.getByText('Blue').click();
        await this.page.getByText('Yellow').click();
        await this.page.getByText('Green').click();
    }

    async dropDownFunction() {
        await this.page.waitForSelector(this.dropDownLoc);
        await this.page.locator(this.dropDownLoc).click();
        await this.page.locator(this.dropDownYes).click();
        await this.page.locator(this.dropDownLoc).click();
        await this.page.locator(this.dropDownNo).click();
    }

    async checkTextFunction() {
        await this.page.getByText('Fast animals').isVisible();
        await this.page.getByText('Falcon').isVisible();
        await this.page.getByText('Eagle').isVisible();
        await this.page.getByText('Horsefly').isVisible();
        await this.page.getByText('Cheetah').isVisible();
    }

    async emailFunction() {
        await this.page.waitForSelector(this.emailLoc);
        await this.page.getByRole('textbox', { name: 'Email' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill('sarf@gmail.com');
    }

    async messageFunction() {
        await this.page.waitForSelector(this.messageLoc);
        await this.page.getByRole('textbox', { name: 'Message' }).click();
        await this.page.getByRole('textbox', { name: 'Message' }).fill('Testing');
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async headerValueValidation() {
        return await this.page.locator(this.headerValidation).textContent();
    }

    async nameValueValidation() {
        return await this.page.locator(this.nameValidation).textContent();
    }

    async checkBoxValueValidation() {
        return await this.page.locator(this.checkBoxValidation).textContent();
    }

    async radioValueValidation() {
        return await this.page.locator(this.radioValidation).textContent();
    }

    async dropDownValueValidation() {
        return await this.page.locator(this.dropDownValidation).textContent();
    }

    async emailValueValidation() {
        return await this.page.locator(this.emailValidation).textContent();
    }

    async messageValueValidation() {
        return await this.page.locator(this.messageValidation).textContent();
    }
}