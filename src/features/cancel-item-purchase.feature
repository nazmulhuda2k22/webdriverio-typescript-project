Feature: Cancel Order

  @regression @smoke
  Scenario: Cancel order without payment
    Given the user logs in from the "login" page
    And the user should be in "My Events" page
    When the user selects the event "Automation Horizon" from date "17 March"
    And the user clicks on the "CONTINUE" button
    Then the user should be in "My Suites" page
    When the user selects a suite
    And the user clicks on the "Continue" button
    And the user clicks Continue button on the modal dialog
    Then the user should be in "CHEQ QA Suite Partner" page
    When the user adds one item from each category 
    And the user opens the cart 
    Then the user should be in "My Order" page
    When the user clicks on the "Cancel Order" button
    And the user clicks on the "Yes, cancel" button
    Then the user should be in "My Events" page