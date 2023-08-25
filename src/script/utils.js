export const handleEscKey = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      openedPopup.close(); // Используем метод close класса Popup для закрытия попапа
    }
  }
};

export const handleOverlayClick = (event) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && event.target === openedPopup) {
    openedPopup.close(); // Используем метод close класса Popup для закрытия попапа
  }
};
