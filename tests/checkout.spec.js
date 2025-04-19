import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
const credentials = JSON.parse(JSON.stringify(require("../testdata/Credentials.json")));

test("Successfull checkout flow", async ({page}) => {

    //Create object of Login page, Products page, Cart Page
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

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

    //Go to Checkout page
    await cartPage.goToCheckoutPage();

    //Fill out your information on first check out page
    await checkoutPage.fillCheckoutInformation("john", "doe", "123124");

    //Proceed to the final checkout page
    await checkoutPage.proceedToFinishPage();

    //Assertion to check same products are present on the checkout page
    const itemsOnCheckout = await checkoutPage.cartItemNames.allInnerTexts();
    expect.soft(itemsToBeAdded).toEqual(itemsOnCheckout);

    //Assertion to check the total price is correctly displayed on final checkout page
    const expectedTotalPrice = await checkoutPage.calculateTotalPrice();
    const actualTotalPrice = await checkoutPage.totalPrice.textContent();
    expect.soft(parseFloat(actualTotalPrice.slice(13))).toEqual(expectedTotalPrice);

    //Finalize the checkout
    await checkoutPage.completeCheckout();

    //Asser the order completion message
    await expect.soft(checkoutPage.orderConfirmationMessage).toHaveText("Thank you for your order!");

});