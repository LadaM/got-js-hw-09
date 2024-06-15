'use strict';
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitButton = form.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const success_msg = `✅ Fulfilled promise ${position} in ${delay}ms`;
  const failure_msg = `❌ Rejected promise ${position} in ${delay}ms`;
  if (shouldResolve) {
    try {
      Notiflix.Notify.success(success_msg);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(success_msg);
    }
  } else {
    try {
      Notiflix.Notify.failure(failure_msg);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(failure_msg);
    }
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
  let allFilled = true;
  inputs.forEach((input) => {
    if (input.value === '') {
      allFilled = false;
    }
  });
  submitButton.disabled = !allFilled;
};

form.addEventListener('input', checkInputs);
