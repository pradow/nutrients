import './components/_matches.polyfill.js';
import './components/some-code.js';

let greetButton = document.querySelector('#greetButton');

function greetUser() {
  console.log('Hello World');
}

greetButton.addEventListener('click', greetUser);
