const inputEl = document.querySelector("#name-input") as HTMLInputElement;

const outputEl = document.querySelector("#name-output") as HTMLSpanElement;

inputEl
  ? inputEl.addEventListener("input", (event: Event) => {
      if (outputEl && event.currentTarget) {
        outputEl.textContent = (event.currentTarget as HTMLInputElement).value;

        if (!outputEl.textContent) {
          outputEl.textContent = "Anonymous";
        }
      }
    })
  : null;
