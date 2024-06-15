'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date_time_picker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      try {
        Notiflix.Notify.failure('Please choose a date in the future');
      } catch (error) {
        console.log(error);
        window.alert('Please choose a date in the future');
      }
    } else {
      startButton.removeAttribute('disabled');
    }
  },
  onOpen() {
    this.setDate(new Date());
  },
});

const startButton = document.querySelector('[data-start]');
const days_countdown = document.querySelector('span[data-days]');
const hours_countdown = document.querySelector('span[data-hours]');
const minutes_countdown = document.querySelector('span[data-minutes]');
const seconds_countdown = document.querySelector('span[data-seconds]');

let interval;
let intervalCleared = false;

function convertMs(timeDifference) {
  const minute_in_ms = 1000 * 60;
  const hour_in_ms = minute_in_ms * 60;
  const day_in_ms = hour_in_ms * 24;

  return {
    days: Math.floor(timeDifference / day_in_ms),
    hours: Math.floor((timeDifference % day_in_ms) / hour_in_ms),
    minutes: Math.floor((timeDifference % hour_in_ms) / minute_in_ms),
    seconds: Math.floor((timeDifference % minute_in_ms) / 1000),
  };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function setTimer() {
  const now = new Date();
  const futureDate = new Date(date_time_picker.selectedDates[0]);
  const timeDifference = futureDate - now;
  if (now < futureDate) {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    days_countdown.textContent = addLeadingZero(days.toString());
    hours_countdown.textContent = addLeadingZero(hours.toString());
    minutes_countdown.textContent = addLeadingZero(minutes.toString());
    seconds_countdown.textContent = addLeadingZero(seconds.toString());
  } else {
    if (!intervalCleared) {
      clearInterval(interval);
      intervalCleared = true;
      // Notiflix.Notify.success('Time is up!');
      startButton.setAttribute('disabled', 'true');
    }
  }
}

startButton.addEventListener('click', () => {
  intervalCleared = false;
  setTimer();
  interval = setInterval(() => setTimer(), 1000);
});
