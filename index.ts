const reservationForm = document.querySelector('#reservation') as HTMLFormElement;
reservationForm.onclick = (event: MouseEvent) => {
  event.stopPropagation();
};

let passengerName: string | null = null;
let passengerSurname: string | null = null;
let departure: string | null = null;
let destination: string | null = null;
let date: Date | null = null;

function checkForm() {
  const submitButton = document.querySelector('input[type=submit]') as HTMLInputElement;
  submitButton.disabled = true;

  if ((passengerName ?? '') === '') {
    return;
  }

  if ((passengerSurname ?? '') === '') {
    return;
  }

  if ((departure ?? '') === '') {
    return;
  }

  if ((destination ?? '') === '') {
    return;
  }

  if (date === null || date < new Date()) {
    return;
  }

  submitButton.disabled = false;
}

checkForm();

const nameInput = document.querySelector('#name') as HTMLInputElement;
nameInput.onchange = () => {
  passengerName = nameInput.value;
  checkForm();
};

const surnameInput = document.querySelector('#surname') as HTMLInputElement;
surnameInput.onchange = () => {
  passengerSurname = surnameInput.value;
  checkForm();
};

const departureInput = document.querySelector('#departure') as HTMLInputElement;
departureInput.onchange = () => {
  departure = departureInput.value;
  checkForm();
};

const destinationInput = document.querySelector('#destination') as HTMLInputElement;
destinationInput.onchange = () => {
  destination = destinationInput.value;
  checkForm();
};

const dateInput = document.querySelector('#date') as HTMLInputElement;
dateInput.onchange = () => {
  date = new Date(dateInput.value);
  checkForm();
};

const modal = document.querySelector('.reservation-modal') as HTMLElement;
modal.style.visibility = 'hidden';

const form = document.querySelector('form') as HTMLFormElement;
form.onsubmit = (ev: Event) => {
  ev.preventDefault();
  form.reset();

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

const closeModal = document.querySelector('.close') as HTMLElement;
closeModal.onclick = () => {
  modal.style.visibility = 'hidden';
};
