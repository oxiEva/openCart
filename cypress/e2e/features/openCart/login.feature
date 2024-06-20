@login @smoke

Feature: Login account

  As a user,
  I want to log into my OpenCart account,
  So that I can access my account details and manage my orders.

  Scenario: Login a user 
    Given the user is on the login page
    When the user fills the login form with email "oxieva@gmail.cat" and password "oxieva"
    And the user clicks the Login button
    Then the user should be redirect to his account
