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
