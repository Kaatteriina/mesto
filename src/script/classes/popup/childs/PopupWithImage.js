import Popup from "../Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    
    this.$figure = this.$popup.querySelector('.popup__figure')
  }

  open(src, caption) {
    const img = this.$figure.querySelector('.popup__image')
    img.src = src
    const figcaption = this.$figure.querySelector('.popup__image-title')
    figcaption.textContent = caption

    this.$popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }
}