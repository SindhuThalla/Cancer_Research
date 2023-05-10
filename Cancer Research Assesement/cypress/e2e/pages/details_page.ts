// Importing DETAILS page URL from the config file
import {DETAILS_URL} from '../config';

export class DetailsPage{

    // Method to navigate to the details page
public navigateToDetailsPage(){
    cy.visit(DETAILS_URL);
}

// Method to enter first name
public enterFirstName(first_name:string){
    cy.get('[data-testid="forename"]').type(first_name,{ force: true });
}

// Method to enter last name
public enterLastName(last_name:string){
    cy.get('[data-testid="surname"]').type(last_name,{ force: true });
}

// Method to enter email address
public enterEmailAddress(email_address:string){
    cy.get('[data-testid="emailAddress"]').type(email_address,{ force: true });
}

// Method to enter phone number
public enterPhoneNumber(phone_number:string){
    cy.get('#phoneNumber').type(phone_number,{ force: true });
}  

// Method to click on enter address manually link
public clickOnEnterAdressManuallyLink(){
    cy.get('.styles__ButtonLink-sc-1hrmoav-2').click({ force: true });
}    

// Method to enter address line 1
public enterAddress1(address1:string){
    cy.get('[name = "addressLine1"]').type(address1,{ force: true });
}  

// Method to enter town
public enterTown(town:string){
    cy.get('[name = "city"]').type(town,{ force: true });
} 

// Method to enter postcode
public enterPostCode(postcode:string){
    cy.get('[name= "postalCode"]').type(postcode,{ force: true });
} 

// Method to select country
public selectCountry(country:string){
    const country_dropdown = cy.get('#country');
    country_dropdown.select(country,{ force: true })
} 

// Method to check email opt in
public checkEmailNo(no:boolean){
    cy.get('input[name="emailOptIn"][value=no]').click({ force: true })
} 

// Method to click on continue button
public clickContinue(){
    cy.get('.iEeNAa').click({ force: true });
} 

// Method to wait for payment page to load
public waitForPaymentPage() {
    cy.wait(2000);
    cy.url().should('include', '/payment');
}

// Method to fill details on the details page
public fillDetails(testData:{firstname:string, lastname:string, email:string, phone:string, homeAddress: {
    address1: string,town: string,postcode: string,country: string},emailOptIn:boolean}) {
    // Calling methods in order to fill in the details
    //this.navigateToDetailsPage();
    this.enterFirstName(testData.firstname);
    this.enterLastName(testData.lastname);
    this.enterEmailAddress(testData.email);
    this.enterPhoneNumber(testData.phone);
    this.clickOnEnterAdressManuallyLink();
    this.enterAddress1(testData.homeAddress.address1);
    this.enterTown(testData.homeAddress.town);
    this.enterPostCode(testData.homeAddress.postcode);
    this.selectCountry(testData.homeAddress.country);
    this.checkEmailNo(testData.emailOptIn);
    this.clickContinue();
  }

}
