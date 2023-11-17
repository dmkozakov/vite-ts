const input = document.querySelector("#validation-input");

input ? input.addEventListener("blur", onInputBlur) : null;

function onInputBlur(event: Event) {
  const target = event.currentTarget as HTMLInputElement;

  if (target.value.length === Number(target.dataset.length)) {
    target.classList.add("valid");
    target.classList.remove("invalid");
  } else {
    target.classList.add("invalid");
    target.classList.remove("valid");
  }
}
