import { configuration, defaultConfiguration } from '../index.js';
import { resetColor } from './colors.js';
import { resetQuote } from './quote.js';
import { resetPattern } from './patterns.js';
import updateCanvas from './canvas.js';

const configContainer = document.querySelector('.wrapper .configuration');

function reset() {
  resetColor();
  resetQuote();
  resetPattern();
  removeResetButton();
  checkConfiguration();
}

function addResetButton() {
  if(document.getElementById('reset')) return;
  const resetBtn = document.createElement('button');
  resetBtn.id = 'reset';
  resetBtn.innerText = 'Reset tile';
  resetBtn.classList.add('btn');
  resetBtn.addEventListener('click', () => reset());

  configContainer.appendChild(resetBtn);
}

function removeResetButton() {
  const button = document.getElementById('reset');
  if(button) button.remove();
}

export function checkConfiguration() {
  updateCanvas();
  
  if(JSON.stringify(configuration) === JSON.stringify(defaultConfiguration)) {
    removeResetButton();
  } else {
    // addResetButton();
  }
}