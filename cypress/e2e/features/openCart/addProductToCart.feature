@regression @aut-3

Feature: Add products to cart

  As a customer,
  I want to add products to my shopping cart
  So that I can easily keep track of the items I want to purchase.

  Scenario Outline: Successful Addition of Product to Cart "<product>"
    Given the user is on the home page
    When the user clicks on the "Add to Cart" button for a product "<product>"
    Then the product "<product>" is added to the cart
    And a confirmation message "Success: You have added <product> to your shopping cart!" is displayed
    And the cart icon updates the number of items to 1
    And the cart total price is updated for a single item

    Examples:
      | product  |
      | MacBook  |
      | iPhone   |

  Scenario:  Successful Addition of Multiple Products to Cart
    Given the user is on the home page
    When the user adds the following items to the cart:
      | product  |
      | MacBook  |
      | iPhone   |
    Then the cart contains 2 items
    And the total price is the sum of the prices of the added products
