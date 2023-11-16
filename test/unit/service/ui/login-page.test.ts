import { expect } from 'chai';
import * as webdriver from 'selenium-webdriver';
import 'selenium-webdriver/chrome';
import 'selenium-webdriver/firefox';
import 'selenium-webdriver/edge';
import 'selenium-webdriver/safari';

let driver: webdriver.WebDriver;

before(function (done) {
    const timeout = 3000;

    setTimeout(function () {
        try {
            driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .build();

            driver.manage().window().maximize();

            console.log('WebDriver successfully initialized.');
            done();
        } catch (error) {
            console.error('Error during WebDriver initialization:', error);
            done(error);
        }
    }, timeout);
});

afterEach(async function (done) {
    try {
      let testCaseName: string = this.currentTest.title;
      let testCaseStatus: string = this.currentTest.state;
  
      if (testCaseStatus === 'failed') {
        console.log(`Test: ${testCaseName}, Status: Failed!`);

      } else if (testCaseStatus === 'passed') {
        console.log(`Test: ${testCaseName}, Status: Passed!`);
      } else {
        console.log(`Test: ${testCaseName}, Status: Unknown!`);
      }
  
      done();
    } catch (error) {
      console.error('Error during afterEach:', error);
      done(error);
    }
  });

after(function () {
    driver.quit();
});

//test
it('should log in successfully', async function () {
    const Url: string = 'http://localhost:3000/login';
    await driver.get(Url);

    console.log(`Page "${Url}" opened`);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('http://localhost:3000/login');

    const usernameBox = await driver.findElement(webdriver.By.id('username'));
    await usernameBox.sendKeys('test@kainos.com');

    const passwordBox = await driver.findElement(webdriver.By.id('password'));
    await passwordBox.sendKeys('testing');

    const loginButton = await driver.findElement(webdriver.By.xpath('//*[@id="main"]/form/button'));
    await loginButton.click();

    const finalUrl = await driver.getCurrentUrl();
    expect(finalUrl).to.include('http://localhost:3000/');
});

it('should display error message with incorrect login credentials', async function () {
    const Url: string = 'http://localhost:3000/login';
    await driver.get(Url);

    console.log(`Page "${Url}" opened`);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('http://localhost:3000/login');

    const usernameBox = await driver.findElement(webdriver.By.id('username'));
    await usernameBox.sendKeys('false-email');

    const passwordBox = await driver.findElement(webdriver.By.id('password'));
    await passwordBox.sendKeys('test');

    const loginButton = await driver.findElement(webdriver.By.xpath('//*[@id="main"]/form/button'));
    await loginButton.click();

    const errorMessageElement = await driver.findElement(webdriver.By.className('alert alert-danger'));
    const errorMessageText = await errorMessageElement.getText();
    expect(errorMessageText).to.equal('Invalid Credentials');
});