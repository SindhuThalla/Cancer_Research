# Cancer_Research
 
Card Donation Testing with Cypress

This project is an example of performing automated end-to-end testing of a card donation process using Cypress. The tests are written in TypeScript and simulate the user interaction with the application, starting from the donation form and ending on the thank-you page.

# Installation 
To install this project, follow these steps:
Clone the repository 
Navigate to the project directory in a terminal 
Run npm install to install the project dependencies

# Running the Tests 
To run the tests, run the following command in a terminal: 
npm run cy:run_spec for headless mode 
npm run cy:run_browser to run the tests on both Chrome and edge browsers.

# Test Cases 

The following test cases are covered in this project:
Filling in the donation details and completing the payment process.
Verifying that the thank-you page shows the correct donation details 
Verifying that the transaction ID and reference code match

# Test Data 

The donor.json file is used as test data used for the donation process and saved in the fixtures directory.

# Pages 
This project uses the Page Object Model pattern to represent the different pages of the donation process. The page objects are stored in the pages directory and contain methods for interacting with the different elements on each page.

# Config 
The configuration for the project is stored in the config.ts file in the root directory. This file contains the URLs for the different pages of the donation process, as well as other configuration options.

# Globals 
The globals.ts file in the root directory contains global variables used throughout the project. This file is used to store the transaction ID and reference code generated during the payment process, which are then used to verify the donation details on the thank-you page.

# Accesibility Testing

Accesibility testing was performed on the website using the AXE tool and the results are shared in the .csv file.
