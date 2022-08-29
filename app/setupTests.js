/**
 * 
 * jest-dom adds custom jest matchers for asserting on DOM nodes.
 * allows you to do things like:
 * expect(element).toHaveTextContent(/react/i)
 * learn more: https://github.com/testing-library/jest-dom
 * 
 * 
*/

import '@testing-library/jest-dom';
import { Builder, By, Capabilities } from 'selenium-webdriver';
const assert = require('assert');

class TestSuite {
  async openDebugApplicationTest() {
    let ability = new Capabilities();
    ability.setPageLoadStrategy('normal');
    let driver = await new Builder()
      .withCapabilities(ability)
      .forBrowser('chrome')
      .build();

    await driver.get('192.168.63.101');
    await driver.getCurrentUrl();
    await driver.getTitle();
    await driver.manage().setTimeouts({ implicit: 1000 });
  
    testBefore('Test items before main tests...', async () => {
      // TODO: code ...
    });
  
    testSignIn('Test User Sign-in functionality', async () => {
      try {
        let loginNavbarItem = await driver
          .findElement(By
            .xpath('/html/body/nav/div/div/div/ul/li[6]/a'));
  
        let emailInput = await driver
          .findElement(By
            .xpath('/html/body/div[1]/div/section/div/div[2]/div/div[2]/form/div[1]/div/input'));
  
        let passwordInput = await driver
          .findElement(By
            .xpath('/html/body/div[1]/div/section/div/div[2]/div/div[2]/form/div[1]/div/input'));
  
        let signInButton = await driver
          .findElement(By
            .xpath('/html/body/div[1]/div/section/div/div[2]/div/div[2]/form/div[3]/div/input'));
  
        await loginNavbarItem.click();
        await emailInput.sendKeys('root');
        await passwordInput.sendKeys('password');
        await signInButton.click();
  
      } catch (error) {
        console.log(error);
      }
  
    });
  
    testPostJob('Test Post Job functionality.', async () => {
      try {
        let postAJobNavbarItem = await driver
          .findElement(By
            .xpath('/html/body/nav/div/div/div/ul/li[1]/a'));
  
  
        await postAJobNavbarItem.click();
  
        let postJobButton = await driver.
          findElement(By
            .xpath());
  
        let matchValue = '';
        let postJobButtonPutValue = postJobButton.getAttribute('value');
        assert.deepStrictEqual(postJobButtonPutValue, matchValue);
      } catch (error) {
        console.log(error);
      }
    });
  
    testAfter('Test after all done.', async () => {
      await driver.quit();
    });
  }

  /** NOTE(Denote private members with `#`):
   *
   * @args arguments delta
   * @return true 
   * 
   * 
   * 
   */
  // #arguments = new String();
  // #delta = any;
}