import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

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
        const Url: string = 'http://localhost:3000/login';
        await driver.get(Url);

        console.log(`Page "${Url}" opened`);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('http://localhost:3000/login');

        const usernameBox = await driver.findElement(By.id('username'));
        await usernameBox.sendKeys('test@kainos.com');

        const passwordBox = await driver.findElement(By.id('password'));
        await passwordBox.sendKeys('testing');

        const loginButton = await driver.findElement(By.id('submitbutton'));
        await loginButton.click();
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

  it('should load job list when logged in', async function() {

    try {
      const navbar = await driver.findElement(By.id('menu-items'));
      const navbarInner = await navbar.findElement(By.className('mega-menu js-mega-menu'));
      const navbarInner2 = await navbarInner.findElement(By.className('mega-menu__items js-menu-items'));
      const jobsLink = await navbarInner2.findElement(By.id('jobsLink'));
      await new Promise(resolve => setTimeout(resolve, 10000));
      await jobsLink.click();

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('http://localhost:3000/jobs');
      
      const jobTable = await driver.wait(until.elementLocated(By.id('jobRolesTable')), 30000);
      expect(await jobTable.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('Error during job list loading:', error);
      throw error;
    }
  });

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