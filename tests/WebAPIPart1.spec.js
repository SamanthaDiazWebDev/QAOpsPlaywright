const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayLoad = {userEmail: "samd1019@gmail.com", userPassword: "Marie1999"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll( async()=> 
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    

});

test('@API Place the Order', async ({ page }) =>
{
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)

    }, response.token);


    await page.goto("https://www.rahulshettyacademy.com/client/")
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    const rows = page.locator("tbody tr");
    await rows.first().waitFor();
    // alternative way await page.locator("tbody").waitFor();
    const totalOrders = await rows.count();
    for(let i=0; i < totalOrders; ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId.trim()))
        {
            await rows.nth(i).locator("button").first().click();
            break;

        }



    }
    const orderIDDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIDDetails)).toBeTruthy();

});

//Verify if order created is showing in history page