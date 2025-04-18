import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
const credentials = JSON.parse(JSON.stringify(require("../testdata/Credentials.json")));


test("Perform successfull login", async ({page}) => {

    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

});

test("Try to login with locked out user", async ({page}) => {

    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin(credentials.lockedUser[0], credentials.lockedUser[1]);

    const error = await loginPage.getErrorMessage();

    expect(error).toContain("Sorry, this user has been locked out");
});
