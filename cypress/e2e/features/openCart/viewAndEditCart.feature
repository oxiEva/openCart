@regression @aut-4

Feature: View and Edit cart

  As a user,
  I want to view and edit my cart contents,
  So that I can manage the products I want to purchase.

  Scenario: View cart content with some products
    Given the user is on the phones and PDAs page
    And the user has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the user clicks at the button cart
    Then the user views the cart
    And the user clicks at the button view cart
    And the user should be redirects to the checkout cart
    And the user should see a list of all added products
    And the total number of items and the total price of the cart should be displayed

  Scenario: Remove a product in the cart 
    Given the user is on the phones and PDAs page
    And the user has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the user clicks at the button cart
    Then the user views the cart
    And the user clicks at the button view cart
    And the user should be redirects to the checkout cart
    And the user should see a list of all added products
    And the user should be able to remove a product "HTC Touch HD"
    And the user should see only "iPhone"


  Scenario: Add another product in the cart 
    Given the user is on the phones and PDAs page
    And the user has the following items to the cart:
      | product       |
      | HTC Touch HD  |
      | iPhone        |
    When the user clicks at the button cart
    Then the user views the cart
    And the user clicks at the button view cart
    And the user should be redirects to the checkout cart
    And the user should see a list of all added products
    And the user should be able to remove a product "HTC Touch HD"
    And the user should see only "iPhone"
    And the user shoud be able to add another "iPhone"



