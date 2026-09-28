const { expect } = require('@playwright/test');
const { customtest } = require("../utils/fixtures.js");


customtest('Fixtures demo', async ({ authenicatedPage, createOrder, testDataForOrder })=>
{
    
    await authenicatedPage.goto('https://www.rahulshettyacademy.com/client/');
    await authenicatedPage.locator("button[routerlink='/dashboard/myorders']").click();
    await authenicatedPage.locator("tbody").waitFor();
    await expect(authenicatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
    
    //order id



}
);