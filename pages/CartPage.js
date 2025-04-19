export class CartPage{
    
    //Constructor to initialize locators on login page
    constructor(page)
    {
        this.title = page.locator(".title");
        this.cartItems = page.locator(".cart_item");
        this.cartQuantity = page.locator(".cart_quantity");
        this.cartItemNames = page.locator(".inventory_item_name");
        this.removeButtons = page.locator(".cart_button");
        this.continueShoppingButton = page.locator("#continue-shopping");
        this.checkoutButton = page.locator("#checkout");
        this.cartBadge = page.locator(".shopping_cart_badge");
    };

    //Method to extract the header for cart page
    async getHeaderTitle()
    {
        return(await this.title.textContent());
    }

    //Method to check the count of cart items
    async getItemCount()
    {
        return(await this.cartItemNames.count());
    }

    //Method to remove a item from the cart
    async removeItem(productName)
    {
        await this.cartItems.filter({hasText: productName}).getByRole("button").click();
    }

    //Method to go back to Products page
    async goToProductsPage()
    {
        await this.continueShoppingButton.click();
    }

    //Method to go the checkout page
    async goToCheckoutPage()
    {
        await this.checkoutButton.click();
    }
    
}