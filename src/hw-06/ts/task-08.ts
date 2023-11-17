interface HTMLFormControlsCollection extends HTMLCollectionBase {
  [item: string]: HTMLInputElement | RadioNodeList;
}

const refs = {
  form: document.querySelector(".login-form") as HTMLFormElement,
  email: document.querySelector('[type="email"]') as HTMLInputElement,
  password: document.querySelector('[type="password"]') as HTMLInputElement,
};

refs.form.addEventListener("submit", onSubmit);

function onSubmit(event: Event) {
  event.preventDefault();

  if (!refs.email.value || !refs.password.value) {
    return alert("All fields must be filled");
  }

  const formEl = event.currentTarget as HTMLFormElement;

  const mail = formEl.elements.email.value;
  const password = formEl.elements.password.value;

  const formData = {
    mail,
    password,
  };

  console.log(formData);

  formEl.reset();
}
