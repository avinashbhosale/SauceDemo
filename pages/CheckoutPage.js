export class CheckoutPage{
    
    //Constructor to initialize locators on Checkout page
    constructor(page)
    {
        this.title = page.locator(".title");
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.zipCode = page.getByPlaceholder("Zip/Postal Code");
        this.errorMessage = page.locator("div.error-message-container h3");
        this.cartList = page.locator(".cart_list");
        this.cartItemNames = page.locator(".inventory_item_name");
        this.cartItemPrices = page.locator(".inventory_item_price");
        this.totalPrice = page.locator(".summary_subtotal_label");
        this.cancelButton = page.locator("button#cancel");
        this.continueButton = page.locator("input#continue");
        this.finishButton = page.locator("button#finish");
        this.orderConfirmationMessage = page.locator("h2.complete-header");
        this.backToHomeButton = page.locator("#back-to-products");
    };

    //Method to fill information on first checkout page
    async fillCheckoutInformation(firstN, lastN, postalCode)
    {
        await this.firstName.fill(firstN);
        await this.lastName.fill(lastN);
        await this.zipCode.fill(postalCode);
    }

    //Method to proceed to the second checkout page
    async proceedToFinishPage()
    {
        await this.continueButton.click();
    }

    //Method to cancel the checkout
    async cancelCheckout()
    {
        await this.cancelButton.click();
    }

    //Method to calculate the total price by adding prices of all items
    async calculateTotalPrice()
    {
        const itemPrices = await this.cartItemPrices.allInnerTexts();
        let totalPrice = 0;
        await itemPrices.forEach(element => {
            totalPrice += parseFloat(element.slice(1));      
        });

        return totalPrice;
    }

    //Method to finish the checkout process
    async completeCheckout()
    {
        await this.finishButton.click();
    }

}