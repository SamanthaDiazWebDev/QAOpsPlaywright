Feature: Eccomerce Validations
    @Validation
    Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username           | password    |
    | samd1019@gmail.com | Marie1920   |
    | hello@123.com      | Iamhello@12 |
