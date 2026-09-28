const base = require('@playwright/test');
const { APiUtils } = require('./APiUtils.js');
const {request} = require('@playwright/test');
const loginPayLoad = {userEmail: "samd1019@gmail.com", userPassword: "Marie1999"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend(
{
    authenicatedPage: async({browser}, use) => 
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://www.rahulshettyacademy.com/client");
        //console.log(await page.title());
        await page.locator("#userEmail").fill("samd1019@gmail.com")
        await page.locator("[type='password']").fill("Marie1999");
        const logIn = page.locator("#login");
        await logIn.click();
        await page.waitForLoadState('networkidle');
        await use(page); 
        // tear down
        await context.close();
    },
    createOrder : async({},use) =>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext, loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        await use(response); 
        //use is a filter which acts as a proxy, so steps before is set up and after is tear down
        await apiContext.dispose();
    },
    testDataForOrder : {
        productName : 'ADIDAS ORIGINAL'
    }
});