export const showInputError = (inputElement, errorMessage, config) => {
  const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

export const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.parentElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

export const checkInputValidity = (inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

export const toggleButtonState = (form, saveButton, config) => {
  const inputs = form.querySelectorAll(config.inputSelector);
  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  saveButton.disabled = !isValid;
};

export const setEventListeners = (form, saveButton, config) => {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      toggleButtonState(form, saveButton, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const saveButton = formElement.querySelector(config.submitButtonSelector);
    setEventListeners(formElement, saveButton, config);
  });
};

export const handleFormSubmit = (event) => {
  event.preventDefault();
  // код обработки отправки формы
};
