import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "notiflix/dist/notiflix-3.2.6.min.css";

Notify.init({
  position: "center-top",
});

const refersEls = {
  startBtn: document.querySelector("[data-start]") as HTMLButtonElement,
  dataDays: document.querySelector("[data-days]") as HTMLSpanElement,
  dataHours: document.querySelector("[data-hours]") as HTMLSpanElement,
  dataMins: document.querySelector("[data-minutes]") as HTMLSpanElement,
  dataSecs: document.querySelector("[data-seconds]") as HTMLSpanElement,
};
refersEls.startBtn.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  altInput: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    if (selectedDate <= Date.now()) {
      refersEls.startBtn.disabled = true;
      Notify.failure("Please choose a date in the future");
      return;
    }

    let isActive = false;
    let intervalId: null | ReturnType<typeof setInterval> = null;

    refersEls.startBtn.disabled = false;
    refersEls.startBtn.addEventListener("click", onStartBtn);

    function onStartBtn() {
      if (isActive) {
        refersEls.dataDays.textContent = "00";
        refersEls.dataHours.textContent = "00";
        refersEls.dataMins.textContent = "00";
        refersEls.dataSecs.textContent = "00";
        clearInterval(intervalId);
        return;
      } else {
        intervalId = setInterval(() => {
          isActive = true;
          const currentDate = Date.now();
          const deltaTime = selectedDate - currentDate;

          if (deltaTime < 10) {
            clearInterval(intervalId);
            Notify.success("You've reached a goal!");
            return;
          }

          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          refersEls.dataDays.textContent = `${days}`;
          refersEls.dataHours.textContent = `${hours}`;
          refersEls.dataMins.textContent = `${minutes}`;
          refersEls.dataSecs.textContent = `${seconds}`;
        }, 1000);
      }
    }
  },
});

function convertMs(ms: number) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value: number) {
  return String(value).padStart(2, "0");
}
