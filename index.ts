let submitButton = document.querySelector('input[type=submit]') as HTMLElement;
submitButton.style.display = 'none';

let nameInput = document.querySelector('#name') as HTMLInputElement;
console.log(nameInput.value);

let delayHeader = document.querySelector('aside.problems h2') as HTMLElement;
delayHeader.innerText = delayHeader.innerText.toUpperCase();

let newFooter = document.createElement('p');
newFooter.innerText = 'All rights reserved.';
document.querySelector('body')?.appendChild(newFooter);

setTimeout(() => {
  console.log('At last.');
}, 2000);

function delay(time: number, handler: () => void): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      handler();
      resolve();
    }, time);
  })
}

async function rainbow(el: HTMLElement) {
  const time = 1000;
  function setBackgroundColorAndWait(color: string): Promise<void> {
    return delay(time, () => el.style.backgroundColor = color);
  }

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
  for (const color of colors) {
    await setBackgroundColorAndWait(color);
  }
}

rainbow(newFooter);

const repoUrl = 'https://api.github.com/repos/Microsoft/TypeScript/commits';

fetch(repoUrl)
  .then((response) => response.json())
  .then((data) => data[0].author.avatar_url)
  .then(fetch)
  .then((response) => response.blob())
  .then((blob) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    document.querySelector('body')?.appendChild(img);
  })
  .catch(console.error);

function fib(x: number): number {
  return x < 2 ? x : fib(x - 1) + fib(x - 2);
}

let i = 0;
const delayMenu = document.querySelector('.problems') as HTMLElement;
delayMenu.onclick = async () => {
  i++;
  console.log(fib(10 * i));

  const currentColor = window.getComputedStyle(delayMenu).getPropertyValue('background-color');
  const [, ...colorsAsText] = /rgb\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor) ?? [];
  const [red, green, blue] = colorsAsText.map((colorAsText) => (parseInt(colorAsText, 10) + 0x20) % 256);

  delayMenu.style.backgroundColor = `rgb(${red},${green},${blue})`;
};

const reservationForm  = document.querySelector('#reservation') as HTMLElement;
reservationForm.onclick = (event: MouseEvent) => {
  event.stopPropagation();
};
