import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
const credentials = JSON.parse(JSON.stringify(require("../testdata/Credentials.json")));

test("Try to login with locked out user", async ({page}) => {

    //Create object of Login page
    const loginPage = new LoginPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //User the perform login method by passing the locked user credentials for failed login attempt
    await loginPage.performLogin(credentials.lockedUser[0], credentials.lockedUser[1]);

    //Store the error message in a variable
    const error = await loginPage.getErrorMessage();

    //Assert to check if the correct error message is displayed
    expect(error).toContain("Sorry, this user has been locked out");
});

test("Perform successfull login", async ({page}) => {

    //Create object of Login page
    const loginPage = new LoginPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //User the perform login method by passing the standar_user credentials for successfull login
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

    //Assert the URL to verify user is logged in
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

});
