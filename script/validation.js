// validate.js

export const showInputError = (inputElement, errorMessage) => {
    const errorElement = inputElement.parentElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__error_visible");
  };
  
  export const hideInputError = (inputElement) => {
    const errorElement = inputElement.parentElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__error_visible");
  };
  
  export const checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  };
  
  export const toggleButtonState = (form, saveButton) => {
    const inputs = form.querySelectorAll(".popup__input");
    const isValid = Array.from(inputs).every((input) => input.validity.valid);
    saveButton.disabled = !isValid;
  };
  
  export const setEventListeners = (form, saveButton) => {
    const inputs = form.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input);
        toggleButtonState(form, saveButton);
      });
    });
  };
  
  export const handleFormSubmit = (event) => {
    event.preventDefault();
    //  код обработки отправки формы
  };
  