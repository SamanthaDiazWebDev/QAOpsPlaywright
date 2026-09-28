import {test, expect, Locator, Page} from '@playwright/test';
export class LoginPage {

    signInbutton: Locator;
    userName: Locator;
    password: Locator;
    page: Page;


constructor(page: Page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("[type='password']");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/auth/login",
        { waitUntil: "domcontentloaded" }
    );
}

async validLogin(username:string, password:string)
{
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    //await this.page.waitForLoadState('networkidle');
}

}

module.exports = {LoginPage};