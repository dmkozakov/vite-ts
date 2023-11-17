let counterValue = 0;

let counterValueEl = document.querySelector("#value");

function decreaseValue() {
  counterValue -= 1;
  counterValueEl ? (counterValueEl.textContent = counterValue.toString()) : null;
}

function increaseValue() {
  counterValue += 1;
  counterValueEl ? (counterValueEl.textContent = counterValue.toString()) : null;
}

const decrementBtn = document.querySelector('button[data-action="decrement"]');

decrementBtn ? decrementBtn.addEventListener("click", decreaseValue) : null;

const incrementBtn = document.querySelector('button[data-action="increment"]');

incrementBtn ? incrementBtn.addEventListener("click", increaseValue) : null;
