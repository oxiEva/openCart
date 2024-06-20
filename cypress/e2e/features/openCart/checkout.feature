Feature: Checkout

  Scenario: Buy a product
    Given the user is on the phones page
    And the user has the following item to the cart:
      | product       |
      | iPhone        |
    And the user clicks at button cart
    And the user views cart
    And the user clicks button view cart
    And the user should be redirected to the checkout cart
    When the user clicks on the checkout button
    Then the user should be redirected to the checkout page
    And the user should choose Guest Checkout and click Continue
    And the user should fill the form billing details
    And the user should fill the form delivery method
    And the user should fill the form payment method
    And the user should be able to click Confirm order
    And the user should be redirected to the Success page
