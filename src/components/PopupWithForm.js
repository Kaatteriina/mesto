import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form'); // Найти форму и сохранить в _form
  }

  _getInputValues() {
    const values = {};
    
    this._form.querySelectorAll('input').forEach((_input) => {
      values[_input.name] = _input.value;
    });

    return values;
  }
  // В классе PopupWithForm

setFormValues(values) {
  const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    const inputName = input.name;
    if (values.hasOwnProperty(inputName)) {
      input.value = values[inputName];
    }
  });
}


  setEventListeners() {
    super.setEventListeners(); // Вызываем метод родительского класса для добавления общих слушателей
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit(event, this._getInputValues());
    });
  }

  close() {
    this._form.reset(); // Очищаем поля формы
    super.close(); // Закрываем попап
  }
  

 
}

