import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
let formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('[name="email"]'),
    textarea: document.querySelector('[name="message"]'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

reloadPage();

function onFormInput(event) {
    // const data = {
    //     email: refs.input.value,
    //     message: refs.textarea.value,
    // };

    formData[event.target.name] = event.target.value.trim();
    console.log(formData);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(event) {
    event.preventDefault();

    console.log(formData);

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
};

function reloadPage() {
    const sevedData = localStorage.getItem(STORAGE_KEY);
    if (sevedData) {
        formData = JSON.parse(sevedData);
        refs.input.value = formData.email || '';
        refs.textarea.value = formData.message || '';
  }
}

