// Import the Thanks page URL from the '../config' file
import {THANKS_URL} from '../config';
import {transaction_id} from '../globals'
let reference_code: string;


export class ThankYouPage{
    //Method to navigate to the thank you page
    public navigateToThankYouPage(){

        cy.visit(THANKS_URL);
    }
    //Method to verify if the thanks message containing donor's first name and amount 
    public verifyThanksMessage(firstname: string, amount: number) {
        cy.wait(2000);
        cy.get('h2.sc-jSMfEi.gsiFqz',{ timeout: 2000 })
          .should('contain.text', `Thank you ${firstname} for your donation of £${amount}`);
      }

      //Method to retrieve the donation reference number from the page 
       public getReferenceNumber() {
          return cy.get('p')
          .contains('Your donation reference is')
          .then((referenceText: JQuery<HTMLElement>) => {
            reference_code  = referenceText.find('strong').text();
            cy.log(reference_code)
          });
      }

      //Method to validate if the donation ID and reference code are equal
      public validateIDandReferenceCode(id: string, referenceCode: string) {
        cy.log(`Validating ID: ${id} and reference code: ${referenceCode}`);
        expect(transaction_id).to.equal(reference_code); 
      }
      

  
    //Method to verify the details by checking the thanks message and retrieving the reference number
    public verifyDetails(testdata:{firstname: string, amount: number}){
        this.verifyThanksMessage(testdata.firstname,testdata.amount);
        this.getReferenceNumber();

    }
    



    }
