Feature: Eccomerce Validations
    @Regression
    Scenario: Placing the Order
    Given a login to Ecommerce application with "samd1019@gmail.com" and "Marie1999"
    When Add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify order is present in order history

    @Validation
    Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username           | password    |
    | samd1019@gmail.com | Marie1920   |
    | hello@123.com      | Iamhello@12 |