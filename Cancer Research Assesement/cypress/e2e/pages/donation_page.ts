// Import the DONATION page URL from the '../config' file
import {DONATION_URL} from '../config';
import 'cypress-iframe';

export class DonationPage{

// Method to navigate to the donation page
public navigateToDonationPage() {
    cy.visit(DONATION_URL);
}

// Method to accept cookies 
public acceptCookies() {

    // Access an iframe element and wait for it to load
    cy.iframe('[title="Optimizely Internal Frame"]',{ timeout: 20000 })

    // Select the 'OK, continue to site' button and click on it
    cy.get('button:contains("OK, continue to site")').click();
}

// Method to select the donation amount by clicking on the appropriate radio button
public selectDonationAmount(amount: string) {
    const amountValue = parseFloat(amount);
    // Use the amount value to select the radio button
    cy.get(`input[name="donationAmount.amountRadioGroup"][value="${amountValue}"]`).click({ force: true });
}

// Method to select the donation type 
public selectDonationType(text:string){
    // Find the span element containing the text 
    cy.contains('span', text)
    .should('have.class', 'sc-fLlhyt')
    .and('have.class', 'imjPqS').click({ force: true });
}

// Method to select the motivation from a dropdown menu
public selectMotivation(text: string) {
    // Select the dropdown element and choose the specified text option
    cy.get('select[name="motivation"]')
      .select(text, { force: true });
}

// Method to select the cancer type option by clicking on the appropriate element
public selectCancerTypeOption(){
    cy.get('#destinationRadioGroup > .qosxO > .sc-kgflAQ > .sc-bBrHrO').click({ force: true });
}

// Method to select the cancer type value from a dropdown menu
public selectCancerTypeValue(text: string) {
    cy.get('select[name="restriction"]')
      .select(text, { force: true });
}

// Method to click on the continue button
public clickOnContinueButton(){
    cy.get('.ButtonGroup__ButtonGroupStyled-sc-yrixzm-0 > .sc-hKMtZM').click({ force: true });
}

// Method to fill the donation details by calling other methods in a sequence
public fillDonationDeatils(testdata:{amount: string, donationType: string, motivation: string, cancerType: string}) {
    // Call other methods in a sequence to fill the details
    this.navigateToDonationPage();
    this.selectDonationAmount(testdata.amount);
    this.acceptCookies();
    this.selectDonationType(testdata.donationType);
    this.selectMotivation(testdata.motivation);
    this.selectCancerTypeOption();
    this.selectCancerTypeValue(testdata.cancerType);
    this.clickOnContinueButton();
}

// Method to wait for DetailsPage
public waitForDetailsPage() {
    cy.wait(2000);
    cy.url().should('include', '/details');
}

}



    