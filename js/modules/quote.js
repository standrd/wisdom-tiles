import { configuration, defaultConfiguration } from '../index.js';
import { checkConfiguration } from './state-manager.js';
import { getRandomItem } from './utils.js';

const buttons = {
  own: document.getElementById('own-quote'),
  dutch: document.getElementById('dutch-quote'),
  world: document.getElementById('world-quote'),
};
const ownQuoteEl = document.querySelector('.own-quote');
const input = document.querySelector('#quote-input');
const translationEl = {
  main: document.querySelector('#translation'),
  origin: document.querySelector('#translation .origin'),
  translation: document.querySelector('#translation .translation'),
  meaning: document.querySelector('#translation .meaning')
};

let quotes = {};

fetch('./assets/data/quotes.json')
  .then(res => res.json())
  .then(data => {
    quotes = data;
    const quote = getQuote(defaultConfiguration.quoteType);
    configuration.quote = quote;
    defaultConfiguration.quote = quote;
    checkConfiguration();
    displayTranslation();
  });

  input.addEventListener('keydown', e => handleQuoteInput(e));
  input.addEventListener('keyup', e => handleQuoteInput(e));


export function initButtons() {
  Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener('click', () => {
      if(key === 'own') {
        ownQuote();
      } else {
        configuration.quoteType = key;
        configuration.quote = getQuote(key);
      }

      displayTranslation();
    });
  });
}

function displayTranslation() {
  if(configuration.quoteType === 'own') {
    translationEl.main.classList.add('hidden');
  } else {
    const { meaning, translation, country } = configuration.quote;

    if(country) {
      translationEl.origin.textContent = `Originated in ${country}`;
      translationEl.origin.classList.remove('hidden');
    } else {
      translationEl.origin.textContent = `Originated in The Netherlands`;
    }

    translationEl.translation.textContent = translation;
    translationEl.meaning.textContent = meaning;
  }
}

export function resetQuote() {
  configuration.quoteType = defaultConfiguration.quoteType;
  const quote = getQuote(defaultConfiguration.quoteType);
  configuration.quote = quote;
  defaultConfiguration.quote = quote;
}

function handleQuoteInput(e) {
  configuration.quote.quote = e.target.value;
  checkConfiguration();
}

function ownQuote() {
  configuration.quoteType = 'own';
  setActiveType('own');
  ownQuoteEl.classList.add('shown');
}

function getQuote(type) {
  configuration.quoteType = type;
  setActiveType(type);
  ownQuoteEl.classList.remove('shown');
  return getRandomItem(quotes[type]);
}

function setActiveType(type) {
  checkConfiguration();
  Object.keys(buttons).forEach(key => {
    if(key === type) {
      buttons[key].classList.add('selected');
    } else {
      buttons[key].classList.remove('selected');
    }
  });
}