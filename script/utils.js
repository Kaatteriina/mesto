// utils.js
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
  const form = popup.querySelector(".popup__form");
  form.reset();
  const submitButton = form.querySelector(".popup__save-button");
  submitButton.disabled = true;
  submitButton.classList.add("popup__save-button_disabled");
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
};

export const handleEscKey = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

export const handlePictureOverlayClick = (event) => {
  if (event.target.classList.contains("popup_picture-view")) {
    const picturePopup = document.querySelector(".popup_picture-view");
    closePopup(picturePopup);
  }
};

export const handleOverlayClick = (event) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && event.target === openedPopup) {
    closePopup(openedPopup);
  }
};

export const handlePictureClick = (event) => {
  const target = event.target;
  if (target.classList.contains("element__image")) {
    const pictureSrc = target.getAttribute("src");
    const pictureTitle = target.getAttribute("alt");
    const picturePopup = document.querySelector(".popup_picture-view");
    const popupImage = picturePopup.querySelector(".popup__image");
    const popupImageTitle = picturePopup.querySelector(".popup__image-title");

    popupImage.src = pictureSrc;
    popupImage.alt = pictureTitle;
    popupImageTitle.textContent = pictureTitle;

    openPopup(picturePopup);
  }
};
