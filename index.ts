const form = document.querySelector('form') as HTMLFormElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const surnameInput = document.querySelector('#surname') as HTMLInputElement;
const departureInput = document.querySelector('#departure') as HTMLInputElement;
const destinationInput = document.querySelector('#destination') as HTMLInputElement;
const dateInput = document.querySelector('#date') as HTMLInputElement;
const submitButton = document.querySelector('input[type=submit]') as HTMLInputElement;

const modal = document.querySelector('.reservation-modal') as HTMLElement;
const closeModal = document.querySelector('.close') as HTMLElement;

let passengerName: string | null = null;
let passengerSurname: string | null = null;
let departure: string | null = null;
let destination: string | null = null;
let date: Date | null = null;

function checkForm() {
  submitButton.disabled
    = (passengerName ?? '') === ''
    || (passengerSurname ?? '') === ''
    || (departure ?? '') === ''
    || (destination ?? '') === ''
    || date === null || date < new Date();
}

function clearForm() {
  passengerName = passengerSurname = departure = destination = date = null;
  form.reset();
  checkForm();
}

function init() {
  nameInput.onchange = () => {
    passengerName = nameInput.value;
    checkForm();
  };

  surnameInput.onchange = () => {
    passengerSurname = surnameInput.value;
    checkForm();
  };

  departureInput.onchange = () => {
    departure = departureInput.value;
    checkForm();
  };

  destinationInput.onchange = () => {
    destination = destinationInput.value;
    checkForm();
  };

  dateInput.onchange = () => {
    date = new Date(dateInput.value);
    checkForm();
  };


  form.onsubmit = (ev: Event) => {
    ev.preventDefault();

    function makeInfo(info: string): HTMLElement {
      const element = document.createElement('p');
      element.innerText = info;
      return element;
    }

    const nameInfo = makeInfo(`Name: ${passengerName}`);
    const surnameInfo = makeInfo(`Surname: ${passengerSurname}`);
    const departureInfo = makeInfo(`Departure: ${departure}`);
    const destinationInfo = makeInfo(`Destination: ${destination}`);
    const dateInfo = makeInfo(`Date: ${date?.toLocaleDateString()}`);

    const modalBody = document.querySelector('.reservation-modal-data') as HTMLElement;
    modalBody.innerHTML = '';
    modalBody.append(nameInfo, surnameInfo, departureInfo, destinationInfo, dateInfo);

    modal.style.visibility = 'visible';
  };

  closeModal.onclick = () => {
    modal.style.visibility = 'hidden';
    clearForm();
  };

  clearForm();
}

init();
