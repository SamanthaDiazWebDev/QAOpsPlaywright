const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayLoad = {userEmail: "samd1019@gmail.com", userPassword: "Marie1999"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {date:[],message:"No Orders"};
let response;

test.beforeAll( async()=> 
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    

});

test('Place the Order', async ({ page }) =>
{
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)

    }, response.token);
    await page.goto("https://www.rahulshettyacademy.com/client/")
    await page.route("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a8d24b021054ba465f01e03",
    async route=>
    {
        //intercepting response - APi response -> {playwright fake browser} -> browser -> render data on front end
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                response,
                body,
            }
        )
    }
    )
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a8d24b021054ba465f01e03");
    // can also use https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/* if you dont want to be specific about the customer. this link was generated from a specific user so the * simplifies it
    console.log(await page.locator(".mt-4").textContent());
    
    

});
