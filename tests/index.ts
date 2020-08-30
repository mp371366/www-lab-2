import { expect } from 'chai';
import { driver, WebElement } from 'mocha-webdriver';

describe('Submit form test', function () {
  const formData = {
    name: 'Jan',
    surname: 'Woreczko',
    departure: 'Warsaw',
    destination: 'Moscow',
    date: daysSinceNow(1),
  };

  async function fillForm() {
    await checkSubmitButtonEnabledState();
    await driver.find(`#departure>option[value="${formData.departure}"]`).click();
    await checkSubmitButtonEnabledState();
    await driver.find(`#destination>option[value="${formData.destination}"]`).click();
    await checkSubmitButtonEnabledState();
    await driver.find('#name').sendKeys(formData.name);
    await checkSubmitButtonEnabledState();
    await driver.find('#surname').sendKeys(formData.surname);
    await checkSubmitButtonEnabledState();
    await driver.find('#date').sendKeys(daysSinceNow(-1));
    await checkSubmitButtonEnabledState();
    await driver.find('#date').sendKeys(daysSinceNow());
    await checkSubmitButtonEnabledState(true);
    await driver.find('#date').sendKeys(formData.date);
    await checkSubmitButtonEnabledState(true);
  }

  it('should display modal with form data', async function () {
    this.timeout(20000);
    await driver.get(`file://${process.cwd()}/index.html`);
    await fillForm();
    expect(await driver.find('.reservation-modal').isDisplayed()).to.be.false;
    await driver.find('input[type="submit"]').doClick();
    expect(await driver.find('.reservation-modal').isDisplayed()).to.be.true;
    const reservationModalData = await driver.find('.reservation-modal-data');
    const [nameInfo, surnameInfo, departureInfo, destinationInfo, dateInfo] = await reservationModalData.findAll('p');
    async function checkInfo(element: WebElement, label: any, value: any) {
      expect(await element.getText()).to.equal(`${label}: ${value}`);
    }
    await checkInfo(nameInfo, 'Name', formData.name);
    await checkInfo(surnameInfo, 'Surname', formData.surname);
    await checkInfo(departureInfo, 'Departure', formData.departure);
    await checkInfo(destinationInfo, 'Destination', formData.destination);
    await checkInfo(dateInfo, 'Date', formData.date);
  });

  it('should disable submit button after form reset', async function () {
    this.timeout(20000);
    await driver.get(`file://${process.cwd()}/index.html`);
    await fillForm();
    await driver.find('input[type="reset"]').doClick();
    await checkSubmitButtonEnabledState();
  });
});

async function checkSubmitButtonEnabledState(enabled = false) {
  expect(await driver.find('input[type="submit"]').isEnabled()).to.equal(enabled);
}

function daysSinceNow(days: number = 0): string {
  return new Date(new Date().setDate(new Date().getDate() + days)).toISOString().substr(0, 10);
}
