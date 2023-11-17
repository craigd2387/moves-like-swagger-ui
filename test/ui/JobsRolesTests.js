/* eslint-env mocha */
/* global browser */
const dotenv = require('dotenv');
const webdriver = require('selenium-webdriver');
const chai = require('chai');  
dotenv.config();
const { UI_URL } = process.env;

describe('View Job Roles Flow', async () => {
    
    /*
    UI Test For View Job Roles

    Navigate to the job roles list

    Expect the page should display a valid list of job roles fetched from the /job-roles API endpoint.
    */
    it('Displays a list of job roles on the job roles page', async () => {

        var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        // Visit the job roles page
        await driver.get(`${UI_URL}/jobs`)
    
        // Assuming the job roles are displayed in a container with class 'job-roles-list'
        await driver.findElement(webdriver.By.className('job-roles-list'));
    
        // Add more specific assertions based on your UI structure
        // For example, check if there are specific job roles listed
        await driver.findElement(webdriver.By.id('job_role_1')).getText().then(function(value) {
            chai.assert.equal(value, 'Trainee Software Engineer');
        });
    
        // Check that the job roles are rendered in a certain way
        // For example, each job role might be inside a table row with class 'job-role'
        // Check that there is more than 0 table rows are returned
        const tableRows = await driver.findElements(webdriver.By.css('tr.job-role-row'));
        chai.assert.isAbove(tableRows.length, 0, 'Expected more than zero rows in the table');

        await driver.quit();
        });
});