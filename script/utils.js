// utils.js
export const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscKey);
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
  
  export const handleOverlayClick = (event) => {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup && event.target === openedPopup) {
      closePopup(openedPopup);
    }
  };
  
  export const handlePictureClick = (event) => {
    const target = event.target;
    if (target.classList.contains("element__image")) {
    openPopup(picturePopup);
    }
  };