import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import 'mocha';

describe('Submit form test', function () {
  it('should display modal with form data', async function () {
    this.timeout(20000);

    await driver.get(`file://${process.cwd()}/index.html`);
    await checkSubmitButtonEnabledState();
    await driver.find('#departure>option[value="Warsaw"]').click();
    await checkSubmitButtonEnabledState();
    await driver.find('#destination>option[value="Moscow"]').click();
    await checkSubmitButtonEnabledState();
    await driver.find('#name').sendKeys('Jan');
    await checkSubmitButtonEnabledState();
    await driver.find('#surname').sendKeys('Woreczko');
    await checkSubmitButtonEnabledState();
    await driver.find('#date').sendKeys(daysSinceNow(-1));
    await checkSubmitButtonEnabledState();
    await driver.find('#date').sendKeys(daysSinceNow(1));
    await checkSubmitButtonEnabledState(true);
    await driver.find('input[type="submit"]').doClick();
  });

  it('should disable submit button after form reset', async function () {
    this.timeout(20000);

    await driver.get(`file://${process.cwd()}/index.html`);
    await checkSubmitButtonEnabledState();
    await driver.find('#departure>option[value="Warsaw"]').click();
    await checkSubmitButtonEnabledState();
    await driver.find('#destination>option[value="Moscow"]').click();
    await checkSubmitButtonEnabledState();
    await driver.find('#name').sendKeys('Jan');
    await checkSubmitButtonEnabledState();
    await driver.find('#surname').sendKeys('Woreczko');
    await checkSubmitButtonEnabledState();
    await driver.find('#date').sendKeys(daysSinceNow(-1));
    await checkSubmitButtonEnabledState();
    await driver.find('#date').sendKeys(daysSinceNow(1));
    await checkSubmitButtonEnabledState(true);
    await driver.find('input[type="reset"]').doClick();
    await checkSubmitButtonEnabledState();
  });
});

async function checkSubmitButtonEnabledState(enabled = false) {
  expect(await driver.find('input[type="submit"]').isEnabled()).to.equal(enabled);
}

function daysSinceNow(days: number): string {
  return new Date(new Date().setDate(new Date().getDate() + days)).toISOString().substr(0, 10);
}
