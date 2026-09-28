import {test as baseTest} from '@playwright/test'

interface testDataForOrder {
    username:string;
    password:string;
    productName:string;
}


export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>(
{

testDataForOrder : 
{
    username : "samd1019@gmail.com",
    password : "Marie1999",
    productName : "ZARA COAT 3"
}

}
)