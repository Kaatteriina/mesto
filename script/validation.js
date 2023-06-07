export const showInputError = (inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

export const hideInputError = (inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

export const checkInputValidity = (inputElement, { inputErrorClass, errorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, { inputErrorClass, errorClass });
  } else {
    hideInputError(inputElement, { inputErrorClass, errorClass });
  }
};

export const toggleButtonState = (form, saveButton, config) => {
  const { inactiveButtonClass } = config;

  const inputs = form.querySelectorAll('.popup__input');
  const isValid = Array.from(inputs).every((input) => input.validity.valid);

  saveButton.disabled = !isValid;
  if (isValid) {
    saveButton.classList.remove(inactiveButtonClass);
  } else {
    saveButton.classList.add(inactiveButtonClass);
  }
};


export const setEventListeners = (form, config) => {
  const { inputErrorClass, errorClass, inactiveButtonClass } = config;
  const saveButton = form.querySelector(config.submitButtonSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, { inputErrorClass, errorClass });
      toggleButtonState(form, saveButton, { inactiveButtonClass });
    });
  });

  form.addEventListener('reset', () => {
    inputs.forEach((input) => {
      hideInputError(input, { inputErrorClass, errorClass });
      toggleButtonState(form, saveButton, { inactiveButtonClass });
    });
  });

  toggleButtonState(form, saveButton, { inactiveButtonClass });
};



export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
    formElement.addEventListener('submit', (event) => handleFormSubmit(event, formElement.querySelector(config.submitButtonSelector)));
  });
};

