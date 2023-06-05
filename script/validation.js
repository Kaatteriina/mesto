function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
  
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
      });
  
      const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
      const submitButton = form.querySelector(settings.submitButtonSelector);
  
      const toggleButtonState = () => {
        const isValid = inputs.every((input) => input.validity.valid);
  
        if (isValid) {
          submitButton.disabled = false;
          submitButton.classList.remove(settings.inactiveButtonClass);
        } else {
          submitButton.disabled = true;
          submitButton.classList.add(settings.inactiveButtonClass);
        }
      };
  
      const showInputError = (input) => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.add(settings.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(settings.errorClass);
      };
  
      const hideInputError = (input) => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.remove(settings.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(settings.errorClass);
      };
  
      const checkInputValidity = (input) => {
        if (input.validity.valid) {
          hideInputError(input);
        } else {
          showInputError(input);
        }
      };
  
      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          checkInputValidity(input);
          toggleButtonState();
        });
      });
    });
  }