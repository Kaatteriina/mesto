import Popup from "../Popup.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, validator) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.validator = validator;
    this.validator.reset();
  }

  _getInputValues() {
    const values = {};
    
    this.$popup.querySelectorAll('input').forEach(($input) => {
      values[$input.name] = $input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners(); // Вызываем метод родительского класса для добавления общих слушателей
    this.$popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit(event, this._getInputValues());
    });
  }
}
