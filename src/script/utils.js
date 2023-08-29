// utils.js



export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", handleEscKey);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", handleEscKey);
};

export const handleEscKey = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

export const handleOverlayClick = (event) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && event.target === openedPopup) {
    closePopup(openedPopup);
  }
};

export const handlePictureClick = (imageElement, titleElement) => {
  const popupImage = document.querySelector(".popup_picture-view .popup__image");
  const popupImageTitle = document.querySelector(".popup_picture-view .popup__image-title");

  popupImage.src = imageElement.src;
  popupImage.alt = titleElement.textContent;
  popupImageTitle.textContent = titleElement.textContent;
  openPopup(document.querySelector(".popup_picture-view"));
};
