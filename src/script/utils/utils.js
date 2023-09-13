// utils.js
// export const openPopup = (popup) => {
//   popup.classList.add("popup_opened");
//   window.addEventListener("keydown", handleEscKey);
// };

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  // window.removeEventListener("keydown", handleEscKey);
};

// export const handleEscKey = (event) => {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     if (openedPopup) {
//       closePopup(openedPopup);
//     }
//   }
// };

export const handleOverlayClick = (event) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && event.target === openedPopup) {
    closePopup(openedPopup);
  }
};


