import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from '../pages/CartPage';
const credentials = JSON.parse(JSON.stringify(require("../testdata/Credentials.json")));

test("Add items to cart and proceed to checkout", async ({page}) => {

    //Create object of Login page, Products page, Cart Page
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    //Go to the Base URL
    await page.goto("https://www.saucedemo.com/");

    //Use the perform login method from loignPage by passing standart user credentials
    await loginPage.performLogin(credentials.standardUser[0], credentials.standardUser[1]);

    //Soft Assert to verify the login was successfull
    expect.soft(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Array of item names to add to cart
    const itemsToBeAdded = ["Sauce Labs Fleece Jacket", "Sauce Labs Onesie", "Sauce Labs Bike Light"];

    //Loop to add all items from the above array to the cart
    for(let i=0; i<itemsToBeAdded.length; i++)
    {
        await productsPage.addProductToCart(itemsToBeAdded[i]);
    };

    //Go to the Cart Page
    await productsPage.goToCart();

    //Assertion for the page header to verify is the user is directed to the cart page
    expect.soft(await cartPage.getHeaderTitle()).toEqual("Your Cart");

    //Assert to see the item count in cart is same as the added products count
    const count = itemsToBeAdded.length;
    const actualCount = await cartPage.getItemCount();
    expect.soft(count).toEqual(actualCount);
    
    //We can also verify the count on the cart badge
    const cartBadgeCount = parseInt(await cartPage.cartBadge.textContent());
    expect.soft(count).toEqual(cartBadgeCount);

    //Assertion to check same products are present in the cart
    const itemsInCart = await cartPage.cartItemNames.allInnerTexts();
    expect.soft(itemsToBeAdded).toEqual(itemsInCart);

    //Proceed to checkout page
    await cartPage.goToCheckoutPage();

    //Assert the page URL to verify if user is directed to checkout page
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
});