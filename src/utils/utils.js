export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  // window.removeEventListener("keydown", handleEscKey);
};

export const handleOverlayClick = (event) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && event.target === openedPopup) {
    closePopup(openedPopup);
  }
};

export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
