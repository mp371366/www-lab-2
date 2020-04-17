let submitButton = document.querySelector('input[type=submit]') as HTMLElement;
submitButton.style.display = 'none';

let nameInput = document.querySelector('#name') as HTMLInputElement;
console.log(nameInput.value);

let delayHeader = document.querySelector('aside.problems h2') as HTMLElement;
delayHeader.innerText = delayHeader.innerText.toUpperCase();

let newFooer = document.createElement('p');
newFooer.innerText = 'All rights reserved.';
document.querySelector('body')?.appendChild(newFooer);
