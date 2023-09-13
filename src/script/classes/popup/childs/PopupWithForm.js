import Popup from "../Popup.js";
import { handleOverlayClick } from "../../../utils/utils.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const values = {
    }
    

    this.$popup.querySelectorAll('input').forEach(($input) => {
      values[$input.name] = $input.value
    })

    return values
  }

  setEventListeners() {
    this.$popup.querySelector('.popup__close-button').addEventListener("click", this.close)
    this.$popup.addEventListener("click", handleOverlayClick)
    this.$popup.querySelector('.popup__form').addEventListener('submit', (event) => this.handleSubmit(event, this._getInputValues()))

  }
}