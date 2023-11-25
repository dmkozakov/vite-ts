import { Notify } from "notiflix/build/notiflix-notify-aio";
import "notiflix/dist/notiflix-3.2.6.min.css";

interface PromiseConfig {
  position: number;
  delay: number;
}

Notify.init({
  position: "center-top",
});

const references = {
  form: document.querySelector(".form") as HTMLFormElement,
};

references.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e: Event) {
  e.preventDefault();

  const formInput = references.form.elements;
  const firstDelay = Number(formInput.delay.value);
  const delayStep = Number(formInput.step.value);

  let delay = firstDelay;

  for (let i = 1; i <= Number(formInput.amount.value); i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onReject);
    delay += delayStep;
  }
}

function createPromise(position: number, delay: number): Promise<PromiseConfig> {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve({ position, delay });
      } else {
        return reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }: PromiseConfig) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }: PromiseConfig) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
