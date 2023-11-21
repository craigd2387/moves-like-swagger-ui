import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

describe('Login Page', function() {
  this.timeout(100000);
 
  let driver: WebDriver;

  before(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--window-size=1920,1080');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

    it('should log in successfully', async function () {
      const Url: string = 'https://mjz7ptyppt.eu-west-1.awsapprunner.com/login';
      await driver.get(Url);

      console.log(`Page "${Url}" opened`);

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('https://mjz7ptyppt.eu-west-1.awsapprunner.com/login');

      const usernameBox = await driver.findElement(By.id('username'));
      await usernameBox.sendKeys('test@kainos.com');

      const passwordBox = await driver.findElement(By.id('password'));
      await passwordBox.sendKeys('testing');

      const loginButton = await driver.findElement(By.id('submitbutton'));
      await loginButton.click();

      const finalUrl = await driver.getCurrentUrl();
      expect(finalUrl).to.include('https://mjz7ptyppt.eu-west-1.awsapprunner.com');
  });

    it('should display error message with incorrect login credentials', async function () {
      const Url: string = 'https://mjz7ptyppt.eu-west-1.awsapprunner.com/login';
      await driver.get(Url);

      console.log(`Page "${Url}" opened`);

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('https://mjz7ptyppt.eu-west-1.awsapprunner.com/login');

      const usernameBox = await driver.findElement(By.id('username'));
      await usernameBox.sendKeys('false-email');

      const passwordBox = await driver.findElement(By.id('password'));
      await passwordBox.sendKeys('test');

      const loginButton = await driver.findElement(By.id('submitbutton'));
      await loginButton.click();

      const errorMessageElement = await driver.findElement(By.id('errormessage'));
      const errorMessageText = await errorMessageElement.getText();
      expect(errorMessageText).to.equal('Invalid Credentials');
  });

  after(async function () {
    driver.quit();
    });
});