// Popup.js
// Popup.js

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close-button").addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }
}

export default Popup;
