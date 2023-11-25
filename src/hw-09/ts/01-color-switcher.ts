const refElements = {
  startBtn: document.querySelector("[data-start]") as HTMLButtonElement,
  stopBtn: document.querySelector("[data-stop]") as HTMLButtonElement,
};

let timerId: null | ReturnType<typeof setTimeout> = null;

refElements.startBtn.addEventListener("click", onStartBtn);
refElements.stopBtn.addEventListener("click", onStopBtn);

refElements.startBtn.disabled = false;
refElements.stopBtn.disabled = true;

function onStartBtn() {
  refElements.startBtn.disabled = true;
  refElements.stopBtn.disabled = false;

  changeColor();
  timerId = setInterval(changeColor, 1000);
}

function onStopBtn() {
  refElements.startBtn.disabled = false;
  refElements.stopBtn.disabled = true;
  clearInterval(timerId);
}

function changeColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6)}`;
}
