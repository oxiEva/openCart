@regression @aut-4

Feature: View and Edit cart

  As a customer,
  I want to view and edit my cart contents,
  So that I can manage the products I want to purchase.

  Scenario: View cart content with some products
    Given the customer is on the phones and PDAs page
    And the customer has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the customer clicks at the button cart
    Then the customer views the cart
    And the customer clicks at the button view cart
    And the customer should be redirects to the checkout cart
    And the customer should see a list of all added products
    And the total number of items and the total price of the cart should be displayed

  Scenario: Remove a product in the cart 
    Given the customer is on the phones and PDAs page
    And the customer has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the customer clicks at the button cart
    Then the customer views the cart
    And the customer clicks at the button view cart
    And the customer should be redirects to the checkout cart
    And the customer should see a list of all added products
    And the customer should be able to remove a product "HTC Touch HD"
    And the customer should see only "iPhone"

  Scenario: Add another product in the cart 
    Given the customer is on the phones and PDAs page
    And the customer has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the customer clicks at the button cart
    Then the customer views the cart
    And the customer clicks at the button view cart
    And the customer should be redirects to the checkout cart
    And the customer should see a list of all added products
    And the customer should be able to remove a product "HTC Touch HD"
    And the customer should see only "iPhone"
    And the customer shoud be able to add another "iPhone"
    And the total number of items and the total price of the cart should be displayed correctly
    And the customer should see an alert with this message " Success: You have modified your shopping cart! "

  Scenario: Remove all the items
    Given the customer is on the phones and PDAs page
    And the customer has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the customer clicks at the button cart
    Then the customer views the cart
    And the customer clicks at the button view cart
    And the customer should be redirects to the checkout cart
    And the customer should see a list of all added products
    And the customer should be able to remove a product "HTC Touch HD"
    And the customer should see only "iPhone"
    And the customer shoud be able to add another "iPhone"
    And the total number of items and the total price of the cart should be displayed correctly
    And the customer should see an alert with this message " Success: You have modified your shopping cart! "
    And the customer should be able to remove a product "iPhone"
    And the customer should see "Your shopping cart is empty!"
