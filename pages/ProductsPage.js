export class ProductsPage{
    
    //Constructor to initialize locators on Products page
    constructor(page)
    {
        this.sideBarButton = page.locator("#react-burger-menu-btn");
        this.allItemsLink = page.locator("#inventory_sidebar_link");
        this.aboutLink = page.locator("#about_sidebar_link");
        this.logoutLink = page.locator("#logout_sidebar_link");
        this.resetAppLink = page.locator("#reset_sidebar_link");
        this.sideBarClose = page.locator("#react-burger-cross-btn");
        this.cartLink = page.locator(".shopping_cart_link");
        this.sortDropdown = page.locator(".product_sort_container");
        this.productImages = page.locator("img.inventory_item_img");
        this.productNames = page.locator(".inventory_item_name");
        this.productPrices = page.locator(".inventory_item_price");
        this.productDescriptions = page.locator(".inventory_item_description");
        this.backToProducts = page.locator("button#back-to-products");
        this.currectSortOption = page.locator("span.active_option");
        this.productDetailName = page.locator("div.inventory_details_name");
    };

    //Method to extract the page URL
    async getURL()
    {
        return(await page.getURL());
    }

    //Method to perform logout
    async performLogout()
    {
        await this.sideBarButton.click();
        await this.logoutLink.click();
    }

    //Method to get the name of the currently selected sort option
    async getCurrentSortName()
    {
        return(await this.currectSortOption.textContent());
    }

    //Method to sort based on argument value passed
    async sortItems(sortingOption)
    {
        await this.sortDropdown.click();
        await this.sortDropdown.selectOption({value: sortingOption});
    }
    
    //Method to go to the cart
    async goToCart()
    {
        await this.cartLink.click();
    }

    //Method to go to Item details page by selecting a particular item
    async goToItemDetails(itemName)
    {
        await this.productNames.filter({value: itemName});
    }

    //Method to reset the App state
    async resetAppState()
    {
        await this.sideBarButton.click();
        await this.resetAppLink.click();
    }

    //Method to go back to products page
    async goToProductsPage()
    {
        await this.sideBarButton.click();
        await this.allItemsLink.click();
    }

    //Method to go the product details page  
    async goToProductDetails(productName)
    {
        await this.productNames.filter({ hasText: productName }).click();
    }

    //Method to get the name on the product from product details page
    async getProductNameFromDetailsPage()
    {
        return(await this.productDetailName.textContent());
    }

    //Method to add a product to the cart
    async addProductToCart(productName)
    {
        await this.productDescriptions
            .filter({hasText: productName})
            .getByRole("button")
            .click();
    }
}