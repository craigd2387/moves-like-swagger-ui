import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';
import * as dotenv from 'dotenv';

dotenv.config();
const { UI_URL } = process.env;
const { TEST_VALID_USERNAME } = process.env;
const { TEST_VALID_PASSWORD } = process.env;
const { VALID_ADMIN_NAME } = process.env;
const { VALID_ADMIN_PASSWORD } = process.env;

describe('Home Page', function() {
  this.timeout(100000);
 
  let driver: WebDriver;

  before(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--window-size=1920,1080');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  describe('Log in', function() {
    it('should log in successfully', async function () {
      try{
        const Url: string = (`${UI_URL}`);
        await driver.get(Url);

        console.log(`Page "${Url}" opened`);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include(`${UI_URL}/login`);

        const usernameBox = await driver.findElement(By.id('username'));
        await usernameBox.sendKeys(`${TEST_VALID_USERNAME}`);

        const passwordBox = await driver.findElement(By.id('password'));
        await passwordBox.sendKeys(`${TEST_VALID_PASSWORD}`);

        const loginButton = await driver.findElement(By.id('submitbutton'));
        await loginButton.click();

        // const redirectedPage = await driver.wait(until.urlIs(`${UI_URL}`), 10000);
        // expect(redirectedPage).to.be.true;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  });

    it('should redirect to homepage', async function () {
      try {
        const finalUrl = await driver.getCurrentUrl();
        expect(finalUrl).to.include('http://localhost:3000');
      } catch (error) {
        console.error('Error during redirect to homepage:', error);
        throw error;
      }
  });
});

describe('View Job Roles', function() {
  it('should begin at homepage', async function() {
    try{
      const finalUrl = await driver.getCurrentUrl();
      expect(finalUrl).to.include('http://localhost:3000');
    } catch (error) {
      console.error('Error during check for homepage:', error);
      throw error;
    }
});

  it('should direct to jobs page', async function() {
    try {
      const jobsLink = await driver.findElement(By.id('jobsLink'));
        await new Promise(resolve => setTimeout(resolve, 10000));
        await jobsLink.click();

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('http://localhost:3000/jobs');
    } catch (error) {
      console.error('Error with jobs link:', error);
    }
  });

  it('should load job list table when logged in', async function() {
    try {
      const Url: string = 'http://localhost:3000/jobs';
        await driver.get(Url);

        console.log(`Page "${Url}" opened`);

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('http://localhost:3000/jobs');
      
      const jobTable = await driver.wait(until.elementLocated(By.id('jobRolesTable')), 50000);
      expect(await jobTable.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('Error during job list loading:', error);
      throw error;
    }
  });

  it('should contain headings "Job Role", "Capability" and "Band Level"', async function () {
    try {
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('http://localhost:3000/jobs');

      const jobTable = await driver.wait(until.elementLocated(By.id('jobRolesTable')), 50000);
      const headerRow = await jobTable.findElement(By.css('thead tr'));

      const headerCells = await headerRow.findElements(By.css('th'));

      expect(headerCells.length).to.equal(3);

      const expectedHeadings = ['Job Role', 'Capability', 'Band Level'];
      for (let i = 0; i < headerCells.length; i++) {
        const actualHeading = await headerCells[i].getText();
        expect(actualHeading).to.equal(expectedHeadings[i]);
      }
    } catch (error) {
      console.error('Error with job list content:', error);
      throw error;
    }
  });

  it('should link the job to the correct content', async function() {
    try {
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('http://localhost:3000/jobs');
  
      // Locate the first row and first cell in the table
      const jobTable = await driver.wait(until.elementLocated(By.id('jobRolesTable')), 50000);
      const firstRow = await jobTable.findElement(By.css('tbody tr:first-child'));
      const firstCell = await firstRow.findElement(By.css('td:first-child a'));
  
      const firstCellTextContent = await firstCell.getText();
      console.log('Text content of the first cell:', firstCellTextContent);
      await new Promise(resolve => setTimeout(resolve, 10000))
      
      await firstCell.click();

      const currentUrlAfterClick = await driver.getCurrentUrl();

      const h1Element = await driver.findElement(By.id('jobSpecTitle'));
      const textContentH1 = await h1Element.getText();

      await driver.wait(until.urlMatches(/\/job-specification\/\d+/), 30000);

      expect(firstCellTextContent).to.equal(textContentH1);    
  
    } catch (error) {
      console.error('Error during clicking on the first cell:', error);
      throw error;
    }
  });

  // it('should direct to the appropriate sharepoint when clicked', async function() {
  //   try{
  //   const buttons = await driver.findElements(By.id('viewSharePointButton'));
  //   const sharepointButton = buttons[0];
  //   await sharepointButton.click();

  //   await driver.wait(until.urlContains('sharepoint'), 20000);

  //   const url = await driver.getCurrentUrl();
  //   expect(url).to.include('sharepoint');
  //   } catch (error) {
  //     console.error('Error during clicking on the sharepoint link:', error);
  //     throw error;
  //   }
  // });

  it('should return to homepage via home button', async function() {
    try {
      const button = await driver.findElement(By.id('homeButton'));
      await new Promise(resolve => setTimeout(resolve, 10000));
      await button.click();

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('http://localhost:3000');
    } catch (error) {
      console.error('Error during return to homepage:', error);
      throw error;
    }
  });
});

  after(async function () {
    driver.quit();
    });
});