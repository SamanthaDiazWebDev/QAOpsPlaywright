const base = require('@playwright/test');

exports.customtest = base.test.extend(
{

testDataForOrder : 
{
    username : "samd1019@gmail.com",
    password : "Marie1999",
    productName : "ZARA COAT 3"
}

}
)