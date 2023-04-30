import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
formEl.addEventListener('submit', onFormSubmit);

let position = 0;
let amount;
let stepDelay = 0;
let formSubmitTime;

function onFormSubmit(event) {
  event.preventDefault();
  amount = Number(amountEl.value);
  stepDelay = Number(stepEl.value);
  createPromise(position, Number(delayEl.value));
  formSubmitTime = Date.now();
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  if (amount === position) {
    return;
  } else {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });

    promise
      .then(({ position, delay }) => {
        position += 1;
        let deltaTime = Math.round((Date.now() - formSubmitTime) / 100) * 100;
        Notify.success(`✅ Fulfilled promise ${position} in ${deltaTime}ms`);
        delay += stepDelay;
        createPromise(position, stepDelay);
      })

      .catch(({ position, delay }) => {
        position += 1;
        let deltaTime = Math.round((Date.now() - formSubmitTime) / 100) * 100;
        Notify.failure(`❌ Rejected promise ${position} in ${deltaTime}ms`);
        delay += stepDelay;
        createPromise(position, stepDelay);
      });
  }
}
