@smoke @aut-5

Feature: Checkout

  Scenario: Buy a product as a guest customer
    Given the guest customer has a iPhone in the cart
    When the guest customer clicks on the checkout button
    Then the guest customer should be redirected to the checkout page
    And the guest customer should choose Guest Checkout and click Continue
    And the guest customer should fill the form billing details
    And the guest customer should fill the form delivery method
    And the guest customer should fill the form payment method
    And the guest customer should be able to click Confirm order
    And the guest customer should be redirected to the Success page with the message "Your order has been placed!"


  Scenario: Buy two products and check taxs
    Given the guest customer has the following items in the cart:
      | product       |
      | iPhone        |
      | HTC Touch HD  |
    When the guest customer clicks on the checkout button
    Then the guest customer should be redirected to the checkout page
    And the guest customer should choose Guest Checkout and click Continue
    And the guest customer should fill the form billing details
    And the guest customer should fill the form delivery method
    And the guest customer should fill the form payment method
    And the guest customer should be able to click Confirm order
    And the order subtotal should be "$201.00"
    And the flat shipping rate should be "$5.00"
    And the order VAT should be "$41.20"
    And the guest customer should be redirected to the Success page with the message "Your order has been placed!"

  Scenario: Guest customer tries to proceed without agreeing to terms and conditions
    Given the guest customer has the following items in the cart:
      | product       |
      | iPhone        |
      | HTC Touch HD  |
    When the guest customer clicks on the checkout button
    Then the guest customer should be redirected to the checkout page
    And the guest customer should choose Guest Checkout and click Continue
    And the guest customer should fill the form billing details
    And the guest customer should fill the form delivery method
    And the guest customer should fill the form payment method without agreeing to terms and conditions
    And the guest customer should see the warning message "Warning: You must agree to the Terms & Conditions!"

  Scenario: Buy two products by a registered user
    Given the registered customer has the following items in the cart:
      | product       |
      | iPhone        |
      | HTC Touch HD  |
    When the registered customer clicks on the checkout button
    Then the registered customer should be redirected to the checkout page
    And the registered customer should see the form billing details with the checkbox "I want to use an existing address" checked and clicks Continue
    And the registered customer should see the form delivery details with the checkbox "I want to use an existing address" checked and clicks Continue
    And the registered customer should fill the form delivery method
    And the registered customer should fill the form payment method
    And the registered customer should be able to click Confirm order
    And the registered customer should be redirected to the Success page with the message "Your order has been placed!"
