import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
const credentials = JSON.parse(JSON.stringify(require("../testdata/Credentials.json")));

test("Sort items by Name(Z-A)", async ({page}) => {

    //Create object of Login page and Products page
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //Use the perform login method from loignPage by passing standart user credentials
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

    //Soft Assert to verify the login was successfull
    expect.soft(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Storing the products names in descending order and storing it for assertion
    const itemNames = await productsPage.productNames.allInnerTexts();
    const sortedItemNamesDesc = await itemNames.sort((a,b) => b.localeCompare(a));

    //Sort the items by name in descending order
    await productsPage.sortItems("za");

    //Asserts to verify if the sort is successfull
    expect.soft(await productsPage.getCurrentSortName()).toEqual("Name (Z to A)");

    //Get the current order of Product names and compare with the above stored Product names array to check if the sorting order is correctly applied
    const itemsAfterSort = await productsPage.productNames.allInnerTexts();
    expect.soft(itemsAfterSort).toEqual(sortedItemNamesDesc);
    
});

test("Sort Items by Price High-Low", async({page}) => {

    //Create object of Login page and Products page
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //Use the perform login method from loignPage by passing standart user credentials
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

    //Soft Assert to verify the login was successfull
    expect.soft(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Storing the products names in descending order and storing it for assertion
    const itemPrices = await productsPage.productPrices.allInnerTexts();
    const sortedPricesDesc = await itemPrices.sort((a, b) => {
        return parseFloat(b.slice(1)) - parseFloat(a.slice(1));
      });

    //Sort the items by name in descending order
    await productsPage.sortItems("hilo");

    //Asserts to verify if the sort is successfull
    expect.soft(await productsPage.getCurrentSortName()).toEqual("Price (high to low)");

    //Get the current order of Product prices and compare with the above stored Product price array to check if the sorting order is correctly applied
    const itemsAfterSort = await productsPage.productPrices.allInnerTexts();
    expect.soft(itemsAfterSort).toEqual(sortedPricesDesc);
});

test("Go to Product Details page", async({page}) => {

    //Create object of Login page and Products page
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //Use the perform login method from loignPage by passing standart user credentials
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

    //Soft Assert to verify the login was successfull
    expect.soft(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Select a product and go to product details page
    await productsPage.goToProductDetails("Sauce Labs Bolt T-Shirt");

    //Assertion to check if the right product detail page is displayed
    const productName = await productsPage.getProductNameFromDetailsPage();
    expect.soft(productName).toEqual("Sauce Labs Bolt T-Shirt");
});

test.only("Add a product to the cart", async({page}) => {

    //Create object of Login page and Products page
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //Use the perform login method from loignPage by passing standart user credentials
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

    //Soft Assert to verify the login was successfull
    expect.soft(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Select a product and go to product details page
    await productsPage.addProductToCart("Sauce Labs Bolt T-Shirt");

    //Assertion to see if the "Remove" text is visible for the particular product
    const buttonText = await productsPage.productDescriptions.filter( {hasText: "Sauce Labs Bolt T-Shirt"}).getByRole("button").textContent();
    expect(buttonText).toEqual("Remove");
});