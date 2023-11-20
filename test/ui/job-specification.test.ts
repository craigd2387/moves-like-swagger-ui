import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as dotenv from 'dotenv';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';
dotenv.config();
const { UI_URL } = process.env;

describe('Job Specification Page', function() {
    this.timeout(100000);
   
    let driver: WebDriver;
   
    before(async function() {
      const options = new chrome.Options();
      options.addArguments('--headless');
      options.addArguments('--window-size=1920,1080');
      driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
      await driver.get(`${UI_URL}/job-specification/:id`);
    });
   
    describe('"more detail" button', function() {
      it('should load job list when clicked', async function() {
        const button = await driver.findElement(By.id('viewJobRolesButton'));
        await new Promise(resolve => setTimeout(resolve, 10000));
        await button.click();
        
        const jobTable = await driver.wait(until.elementLocated(By.id('jobs')), 30000);
        expect(await jobTable.isDisplayed()).to.be.true;
      });
    });
   
    describe('"First View in Sharepoint" button', function() {
      it('should redirect to the appropriate page when clicked', async function() {
        const buttons = await driver.findElements(By.id('viewSharePointButton'));
        const sharepointButton = buttons[0];
        await sharepointButton.click();
   
        await driver.wait(until.urlContains('sharepoint'), 20000);
   
        const url = await driver.getCurrentUrl();
        expect(url).to.include('sharepoint');
      });
    });
   
    after(async function() {
      await driver.quit();
    });
  });