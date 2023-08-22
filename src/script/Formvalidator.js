class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }
  
    reset() {
      this._formElement.reset();
      this.removeValidationErrors();
      this._toggleButtonState(); 
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _toggleButtonState() {
      const isValid = this._inputList.every((input) => input.validity.valid);
      if (isValid) {
        this.enableSubmitButton();
      } else {
        this.disableSubmitButton();
      }
    }
  
    _setEventListeners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    removeValidationErrors() {
      this._inputList.forEach((inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass);
      });
      this.disableSubmitButton();
    }
  
    disableSubmitButton() {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    }
  
    enableSubmitButton() {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  
    enableValidation() {
      this._formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      });
  
      this._setEventListeners();
  
      this.removeValidationErrors();
    }
  }
  
  export { FormValidator };
  
  
  
  
    
    