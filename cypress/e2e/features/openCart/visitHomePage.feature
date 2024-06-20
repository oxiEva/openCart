@regression

Feature: Visit Home Page

  As a user,
  I want to visit the home page of OpenCart,
  So that I can view the products and services offered.

  Scenario: User visits the home page
    Given I am on the home page
    Then I should see the logo link on the home page
