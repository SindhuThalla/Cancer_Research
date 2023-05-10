// Import the PAYMENT page URL from the '../config' file
import {PAYMENT_URL} from '../config';
let transaction_id: string;


export class PaymentPage{
    //Method to navigate to the payment page URL 
    public navigateToPaymentPage(){
        cy.visit(PAYMENT_URL);
    }
    //Method to select the payment type as a credit card
    public selectCardPaymentType(){
        cy.get('#bt0').click({ force: true})
    }
    
    //Method to enter the cardholder name
    public enterCardHolderName(name:string){
        cy.get('#cardholderName').type(name,{ force: true })
    }
    //Method to enter the card number in the iframe
    public enterCardNumber(card_number:string){
        cy.iframe('#braintree-hosted-field-number').find('#credit-card-number').wait(500).type(card_number,{ force: true });
    }
    //Method to enter the card expiry date in the iframe
    public enterExpiryDate(expiry_date:string){
        cy.iframe('#braintree-hosted-field-expirationDate').find('#expiration').wait(500).type(expiry_date,{ force: true });
    }
    //Method to enter the card number in the iframe
    public enterCvv(cvv:string){
        cy.iframe('#braintree-hosted-field-cvv').find('#cvv').wait(500).type(cvv,{ force: true });
    }
    //Method to select the gift aid option
    public selectGiftAid(){
        cy.get('.FormFields__FormFieldsStyled-sc-1bav6xx-0 > .Checkbox__CheckboxContainer-sc-15tsvpd-0 > .Checkbox__StyledLabel-sc-15tsvpd-2').click({ force: true })
    }

    //Method to intercept the POST request to the donation API endpoint
    public clickCompleteMyDonationButton(){
        //intercept the POST request to the donation API endpoint
        cy.intercept('POST', 'https://api.pws.int.cruk.org/transaction').as('donationRequest');
        //Click on the CompleteMyDonationButton
        cy.get('.jCJlcI > .sc-hKMtZM').click({ force: true })
        //waits for the request to complete, extracts the transaction ID from the response.
        cy.wait('@donationRequest').then((interception) => {
            const response = interception.response?.body;
            if (response) {
                // extract the ID from the response
                transaction_id = response.id;
                cy.log(transaction_id );
              } else {
                // handle the case where the response is undefined
                cy.log('Response is undefined');

              }
            });
    }
    
      
    
     //Method to verify error message
    public verifyErrorMessage(){
        cy.get('.ErrorBox-sc-14hrqie-0') // Get the div element using class name
          .should('contain', 'Sorry but we can\'t process your payment with this card.') // Validate the error message

    }

    
//Method to fill the payment details by calling other methods in a sequence
    public fillPaymentDetails(name:string,testData:{cardNumber:string, cvv:string, cardExpiry:string}) {
       // this.navigateToPaymentPage();
        this.selectCardPaymentType();
        this.enterCardHolderName(name);
        this.enterCardNumber(testData.cardNumber);
        this.enterExpiryDate(testData.cardExpiry);
        this.enterCvv(testData.cvv);
        this.clickCompleteMyDonationButton();
      }
     //Method to wait for ThankyouPage
      public waitForThankyouPage() {
        cy.wait(20000);
        cy.url().should('include', '/thanks');
    }







}