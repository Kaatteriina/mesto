import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figure = this._popup.querySelector('.popup__figure');
 
  }

  open(src, caption) {
    const img = this._figure.querySelector('.popup__image');
    img.src = src;
    const figcaption = this._figure.querySelector('.popup__image-title');
    figcaption.textContent = caption;
    
    super.open(); // Вызываем метод родительского класса для открытия попапа
  }
}
