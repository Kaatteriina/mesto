// PopupWithForm.js
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this._formElement.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
