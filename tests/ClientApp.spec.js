const {test, expect} = require('@playwright/test');

test.skip('Client App Login', async ({browser})=>
{

    // chrome - plugins/cookies
        const email = "samd1019@gmail.com";
        const productName = 'ZARA COAT 3';
        const context = await browser.newContext();
        const page = await context.newPage();
        const userEmail = page.locator("#userEmail");
        const logIn = page.locator("#login");
        const products = page.locator(".card-body");
        // or you can do page.locator("[value='Login']")
        const cardTitles = page.locator(".card-body b");
        await page.goto("https://www.rahulshettyacademy.com/client/auth/login");
        console.log(await page.title());
        await userEmail.fill(email);
        await page.locator("[type='password']").fill("Marie1999");
        await logIn.click();
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        // await paige.locator(".card-body b").first().waitFor(); instead of ^
        //console.log(await cardTitles.first().textContent()); not needed because we used networkidle to load every title
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
        // Zara Coat 3
        const count = await products.count();
        for(let i=0; i < count; ++i)
        {
            if ( await products.nth(i).locator("b").textContent() === productName )
            {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
    
            }



        }
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        await page.locator("[placeholder*='Country']").pressSequentially("ind");
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for(let i=0; i< optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text === " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
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