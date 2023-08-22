// PopupWithImage.js
import Popup from "./Popup.js";
import { openPopup, closePopup } from "./utils.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageTitle = this._popup.querySelector(".popup__image-title");
  }

  open(imageSrc, imageTitle) {
    this._popupImage.src = imageSrc;
    this._popupImage.alt = imageTitle;
    this._popupImageTitle.textContent = imageTitle;
    openPopup(this._popup); // Используем openPopup из utils.js
  }
}

export default PopupWithImage;
