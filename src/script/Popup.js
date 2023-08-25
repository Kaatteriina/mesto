// Popup.js
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._overlay = this._popup.querySelector(".popup__overlay");
  }

  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscKey);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscKey);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._overlay.addEventListener("click", (event) => {
      if (event.target === this._overlay) {
        this.close();
      }
    });
  }
}

export default Popup;
