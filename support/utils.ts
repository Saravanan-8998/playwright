import { Page } from '@playwright/test';

export const click = async (page: Page, Role: any, name: any) => {
    await page.getByRole(Role, { name }).click();
};

export const getValue = async (page: Page, Role: any, name: any) => {
    await page.getByRole(Role, { name }).click();
};