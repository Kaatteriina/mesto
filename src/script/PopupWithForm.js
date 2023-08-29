// PopupWithForm.js
import Popup from "./Popup.js";


class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    // ...
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  open() {
    super.openPopup(this._popup);
  }

  close() {
    super.closePopup(this._popup);
  }
}


export default PopupWithForm;