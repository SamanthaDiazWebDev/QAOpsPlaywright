const {test, expect} = require('@playwright/test');


test('@Web Browser Context First Playwright test', async ({browser})=>
{

    // chrome - plugins/cookies
        const context = await browser.newContext();
        const page = await context.newPage();
        //page.route('**/*.{jpg,png,jpeg}', route=> route.abort()); remove images on site
        //page.route('**/*.css', route=> route.abort()); remove css on site
        const userName = page.locator("#username");
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");
        page.on('request', request=> console.log(request.url())); //all the requests that happen on the browser can be taken and put in the output
        page.on('response', response=> console.log(response.url(), response.status())); //this will give the status calls for all of the requests (200=good)
        await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        await userName.fill("rahulshetty");
        await page.locator("[type='password']").fill("Learning@830$3mK2");
        await signIn.click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();
        console.log(await cardTitles.nth(1).textContent());
        console.log(await cardTitles.first().textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);





});



test('@Web UI Controls', async ({page})=>
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.pause();
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); //clicks the button so its unchecked
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect( await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    
    // assertion 
    //await page.pause();



});

test('Child windows hadl', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //listen for any new page
        documentLink.click(),
    
    ]) // new page is opened
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").inputValue());
    


});