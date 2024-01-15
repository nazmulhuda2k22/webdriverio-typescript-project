Feature: Purchase Items from the Automation Horizon Event

  Background: Open Cart after adding items from each category
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

  @regression @sanity @smoke
  Scenario: Complete Payment for the order with valid card details
    When the user clicks on the "Save Pre-Order" button
    And the user selects payment by Credit Card
    And the user pays with valid card details

  @regression @sanity @smoke
  Scenario: Validate total amounts in the cart 
    Then the subtotal amount should be equal to the sum of the items in the cart
    And the order total amount should be equal to the sum of all the taxes and fees
  
  @regression
  Scenario: Verify error text without payment details
    When the user clicks on the "Save Pre-Order" button
    And the user selects payment by Credit Card
    And the user clicks Verify subtotal button
    Then there should be error text "Card number field is empty" under "CARD NUMBER" field
    And there should be error text "Expiry date field is empty" under "EXPIRY DATE" field
    And there should be error text "Security code field is empty" under "CVC/CVV" field
    And there should be error text "Invalid cardholder name" under "NAME ON CARD" field
