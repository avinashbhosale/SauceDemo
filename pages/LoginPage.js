
export class LoginPage{
    
    //Constructor to initialize locators on login page
    constructor(page)
    {
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.locator("#login-button");

        this.errorMessage = page.locator("h3[data-test='error']");
    };

    //Method to extract the page URL
    async getURL()
    {
        return(await page.getURL());
    }

    //Method to perform login
    async performLogin(username, password)
    {
        await this.usernameInput.type(username);
        await this.passwordInput.type(password);
        await this.loginButton.click();
    }

    //Method to retrieve the error message
    async getErrorMessage()
    {
        return(await this.errorMessage.textContent());
    }
    
}