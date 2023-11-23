import throttle from "lodash/throttle";

type Inputs = {
  [prop: string]: string;
};

const STORAGE_KEY = "feedback-form-state";

const refers = {
  feedbackForm: document.querySelector(".feedback-form") as HTMLFormElement,
  emailInput: document.querySelector('[name="email"]') as HTMLInputElement,
  messageInput: document.querySelector('[name="message"]') as HTMLInputElement,
};

refers.feedbackForm.addEventListener("input", throttle(onFormInput, 500));
refers.feedbackForm.addEventListener("submit", onSubmitBtn);

const formData: Inputs = {
  email: "",
  message: "",
};

console.log(formData);
saveFormData();

function onFormInput(evt: Event) {
  const target = evt.target as HTMLInputElement;

  formData[target.name] = target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitBtn(evt: Event) {
  evt.preventDefault();
  (evt.currentTarget as HTMLFormElement).reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
  formData.email = "";
  formData.message = "";
}

function saveFormData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      refers.emailInput.value = parsedData.email;
      refers.messageInput.value = parsedData.message;

      formData.email = parsedData.email;
      formData.message = parsedData.message;
    }
  } catch (error: any) {
    console.log(error.name);
    console.log(error.message);
  }
}
