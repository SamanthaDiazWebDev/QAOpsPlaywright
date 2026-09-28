const {test, expect} = require('@playwright/test');

test('Security test request intercept', async({page})=>
{
    //login and reach orders page
    const logIn = page.locator("#login");
    await page.goto("https://www.rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("samd1019@gmail.com")
    await page.locator("[type='password']").fill("Marie1999");
    await logIn.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
   // route.continue -> intercepts request calls
   route=> route.continue({url : 'https://www.rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aa23d54e7cd69710fce5fe5'}))
   await page.locator("button:has-text('View')").first().click();
   await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})