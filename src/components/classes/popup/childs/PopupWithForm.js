import Popup from "../Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, validator) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.validator = validator;
    this._form = this.$popup.querySelector('.popup__form'); // Найти форму и сохранить в _form
  }

  _getInputValues() {
    const values = {};
    
    this._form.querySelectorAll('input').forEach(($input) => {
      values[$input.name] = $input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners(); // Вызываем метод родительского класса для добавления общих слушателей
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit(event, this._getInputValues());
    });
  }

  close() {
    if (typeof this.validator === 'object' && typeof this.validator.reset === 'function') {
      this.validator.reset();
    }

    super.close();
  }

  resetForm() {
    this._form.reset();
  }
}

