@login @smoke

Feature: Login account

  As a customer,
  I want to log into my OpenCart account,
  So that I can access my account details and manage my orders.

  Scenario: Login a customer 
    Given the customer is on the login page
    When the customer fills the login form with valid credentials
    And the customer clicks the Login button
    Then the customer should be redirect to his account
