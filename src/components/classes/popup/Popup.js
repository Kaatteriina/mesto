export default class Popup {
  constructor(popupSelector) {
    this.$popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.$popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.$popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target === this.$popup) {
      this.close();
    }
  }

  setEventListeners() {
    this.$popup.querySelector('.popup__close-button').addEventListener("click", this.close);
    this.$popup.addEventListener("click", this._handleOverlayClick.bind(this));
  }
}
