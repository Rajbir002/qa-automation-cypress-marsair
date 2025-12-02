Feature: MarsAir Flight Search

  Background:
    Given User is on the MarsAir home page

    @TC01
    Scenario: To perform a search for available seats
      When User selects "July" as the departing date
      And User selects "December (two years from now)" as the return date
      And User searches for flight
      Then A message containing "Seats available! Call 0800 MARSAIR to book!" should be seen

    @TC02
    Scenario: To perform a search for unavailable seats
      When User selects "December" as the departing date
      And User selects "December (next year)" as the return date
      And User searches for flight
      Then A message containing "Sorry, there are no more seats available." should be seen
      
    @TC03
    Scenario: To perform a search with an invalid date
      When User selects "July" as the departing date
      And User selects "December" as the return date
      And User searches for flight
      Then A message containing "Unfortunately, this schedule is not possible. Please try again." should be seen

    @TC04
    Scenario: To verify the usage of a valid promo code for a 30% discount
      When User selects "July" as the departing date
      And User selects "December (two years from now)" as the return date
      And User inserts a promotional code "AF3-FJK-418"
      And User searches for flight
      Then A promo message containing "Promotional code AF3-FJK-418 used: 30% discount!" is displayed

    @TC05
    Scenario: To verify that invalid promo code is not accepted
      When User selects "July" as the departing date
      And User selects "December (two years from now)" as the return date
      And User inserts a promotional code "AF3-FJK-419"
      And User searches for flight
      Then A promo message containing "Sorry, code AF3-FJK-419 is not valid" is displayed

    @TC06
    Scenario: To verify that logo link returns user to home page
      When User selects "July" as the departing date
      And User selects "December (next year)" as the return date
      And User searches for flight
      Then User clicks on logo and lands on the home page with headings "Welcome to MarsAir!" "Book a ticket to the red planet now!"
