import {DonationPage} from './pages/donation_page';
import {DetailsPage} from './pages/details_page';
import {PaymentPage} from './pages/payment_page';
import {ThankYouPage} from './pages/thankyou_page';
import {DETAILS_URL} from './config';
import { transaction_id } from './globals';
import {reference_code} from './globals';

describe('Card Donation Test', function() {
  it('fills donation details, completes payment, and verifies reference code', function() {
    // Load donor data from fixture file
    cy.fixture('donor.json').then((data) => {
      
      // Created page objects for each page
      const donationPage = new DonationPage();
      const detailsPage = new DetailsPage();
      const paymentPage = new PaymentPage();
      const thankyouPage = new ThankYouPage();
      
      // Fill in donation details and navigate to the details page
      donationPage.fillDonationDeatils(data);
      donationPage.waitForDetailsPage();
      
      // Fill in donor details and navigate to the payment page
      detailsPage.fillDetails(data);
      detailsPage.waitForPaymentPage();
      
      // Fill in payment details and click the donation button to complete payment
      paymentPage.fillPaymentDetails('abc', data);
      paymentPage.waitForThankyouPage();
      
      // Verify that the transaction ID and reference code match
      thankyouPage.validateIDandReferenceCode(transaction_id, reference_code);
      
      // Verify that the thank you page shows the correct details
      thankyouPage.verifyDetails(data);
    
    });
  });
});
