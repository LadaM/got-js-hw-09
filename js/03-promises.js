'use strict';
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitButton = form.querySelector('button[type="submit"]');
submitButton.disabled = true; // Disable button by default

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const count = Number(form.elements.amount.value);
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  for (let i = 1; i <= count; i += 1) {
    setTimeout(() => {
      createPromise(i, delay + i * step);
    }, delay + i * step);
  }
  form.reset();
  submitButton.disabled = true;
});

const inputs = [form.elements.delay, form.elements.step, form.elements.amount];
const checkInputs = () => {
  console.log(inputs);
  let allFilled = true;
  inputs.forEach((input) => {
    if (input.value === '') {
      allFilled = false;
    }
  });
  submitButton.disabled = !allFilled;
};

form.addEventListener('input', checkInputs);
