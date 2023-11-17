function getRandomHexColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6)}`;
}

const refsEl = {
  bodyEl: document.querySelector("body"),
  changeColorBtn: document.querySelector(".change-color") as HTMLButtonElement,
  textColorEl: document.querySelector(".color") as HTMLSpanElement,
};

refsEl.changeColorBtn.addEventListener("click", onChangeColorBtn);

function onChangeColorBtn() {
  const color = getRandomHexColor();
  refsEl.bodyEl.style.backgroundColor = color;
  refsEl.textColorEl.textContent = color;
}
