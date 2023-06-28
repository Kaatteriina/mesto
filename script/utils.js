export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

export function handlePictureClick(popupImage, popupImageTitle) {
  const target = event.target;
  if (target.classList.contains("element__image")) {
    popupImage.src = target.src;
    popupImage.alt = target.alt;
    popupImageTitle.textContent = target.alt;
    openPopup(popupImage);
  }
}

