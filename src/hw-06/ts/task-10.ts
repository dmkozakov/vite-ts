function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6)}`;
}

const refEls = {
  input: document.querySelector("[type='number']") as HTMLInputElement,
  createBtn: document.querySelector("[data-create]") as HTMLButtonElement,
  destroyBtn: document.querySelector("[data-destroy]") as HTMLButtonElement,
  boxesContainer: document.querySelector("#boxes") as HTMLDivElement,
};

refEls.createBtn.addEventListener("click", createBoxes);
refEls.destroyBtn.addEventListener("click", destroyBoxes);

function createBoxesMarkup(amount: number) {
  refEls.boxesContainer.innerHTML = "";
  let createBoxesStr = "";

  for (let i = 1; i <= amount; i += 1) {
    createBoxesStr += "<div></div>";
  }

  return createBoxesStr;
}

function createBoxes() {
  if (Number(refEls.input.value) > 0 && Number(refEls.input.value) < 101) {
    refEls.boxesContainer.insertAdjacentHTML(
      "afterbegin",
      createBoxesMarkup(Number(refEls.input.value))
    );

    const boxes = [...refEls.boxesContainer.children] as HTMLElement[];

    let initialWidth = 30;
    let initialHeight = 30;

    for (let i = 0; i < boxes.length; i += 1) {
      boxes[i].style.width = `${initialWidth}px`;
      boxes[i].style.height = `${initialHeight}px`;
      boxes[i].style.backgroundColor = `${getRandomHexColor()}`;

      initialWidth += 10;
      initialHeight += 10;
    }
  } else {
    alert("Enter value between 1 and 100");
  }
}

function destroyBoxes() {
  refEls.boxesContainer.innerHTML = "";
  refEls.input.value = "";
}
