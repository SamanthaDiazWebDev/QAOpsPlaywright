const {test, expect} = require('@playwright/test');

test('Practice Playwright test', async ({browser})=>
{

    // chrome - plugins/cookies
        const email = "samd1019@gmail.com";
        const productName = 'ZARA COAT 3';
        const context = await browser.newContext();
        const page = await context.newPage();
        const userEmail = page.locator("#userEmail");
        const products = page.locator(".card-body");
        // or you can do page.locator("[value='Login']")
        const cardTitles = page.locator(".card-body b");
        await page.goto("https://www.rahulshettyacademy.com/client/auth/login");
        console.log(await page.title());
        await page.getByPlaceholder("email@example.com").fill(email);
        await page.getByPlaceholder("enter your passsword").fill("Marie1999");
        await page.getByRole('button', {name: "Login"}).click();
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        
        await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
        .getByRole("button",{name:"Add to Cart"}).click();

        await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();


        await page.locator("div li").first().waitFor();
        await expect(page.getByText("ZARA COAT 3")).toBeVisible();
        await page.getByRole("button",{name: "Checkout"}).click();
        await page.getByPlaceholder("Select Country").pressSequentially("ind");

        await page.getByRole("button",{name:"India"}).nth(1).click();
        await page.getByText("PLACE ORDER").click();
        await expect(page.getByText("Thankyou for the order. ")).toBeVisible();



        
        
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        await page.locator("button[routerlink='/dashboard/myorders']").click();
        const rows = page.locator("tbody tr");
        await rows.first().waitFor();
        // alternative way await page.locator("tbody").waitFor();
        const totalOrders = await rows.count();
        for(let i=0; i < totalOrders; ++i)
        {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId.trim()))
            {
                await rows.nth(i).locator("button").first().click();
                break;
    
            }



        }
        const orderIDDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIDDetails)).toBeTruthy();
        await page.pause();

});