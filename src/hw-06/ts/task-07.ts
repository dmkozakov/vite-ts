const inputElement = document.querySelector("#font-size-control") as HTMLInputElement;

const textEl = document.querySelector("#text") as HTMLSpanElement;

inputElement ? inputElement.addEventListener("input", onInputRange) : null;

function onInputRange(event: Event) {
  const input = event.currentTarget as HTMLInputElement;

  if (textEl) {
    textEl.style.fontSize = `${input.value}px`;
  }
}
