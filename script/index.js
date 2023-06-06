import { initialCards } from "./cards.js";
import {
  editButton,
  popupEdit,
  popupEditCloseButton,
  popupEditForm,
  nameInput,
  aboutInput,
  profileName,
  profileDescription,
  addButton,
  popupCard,
  closeButtonCard,
  elementsContainer,
  cardTemplate,
  popupPic,
  popupImage,
  popupTitle,
  closeButtonPic,
  likeButtons,
  titleInput,
  linkInput,
  saveButton,
  formCard,
  popupCardForm,
  popupCardSaveButton,
  popups,
} from "./constants.js";

import { enableValidation } from './validation.js';


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция enableValidation
enableValidation(validationConfig); 

document.querySelector(".profile__edit-button")
  document.addEventListener("click", function () {
    openPopup(document.querySelector(".popup_edit"));
    document.querySelector(".popup__input_type_name").value =
      document.querySelector(".profile__name").textContent;
    document.querySelector(".popup__input_type_about").value =
      document.querySelector(".profile__description").textContent;
  });

document.querySelector(".popup_edit .popup__close-button")
  document.addEventListener("click", function () {
    closePopup(document.querySelector(".popup_edit"));
  });

document.querySelector(".popup_edit .popup__form")
 document.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector(".profile__name").textContent =
      document.querySelector(".popup__input_type_name").value;
    document.querySelector(".profile__description").textContent =
      document.querySelector(".popup__input_type_about").value;

    closePopup(document.querySelector(".popup_edit"));
  });

document.querySelector(".profile__add-button")
  document.addEventListener("click", function () {
    openPopup(document.querySelector(".popup_card"));
  });

document.querySelector(".popup_card .popup__close-button_card")
  document.addEventListener("click", function () {
    closePopup(document.querySelector(".popup_card"));
  });

function handleEscKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  saveButton.classList.add("popup__save-button_disabled");
  document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function createCard(name, image) {
  const cardElement = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  const titleElement = cardElement.querySelector(".element__title");
  const deleteButton = cardElement.querySelector(".element__delete-button");

  imageElement.src = image;
  imageElement.alt = name;
  titleElement.textContent = name;

  const popupPic = document.querySelector(".popup_picture-view");
  const popupImage = popupPic.querySelector(".popup__image");
  const popupTitle = popupPic.querySelector(".popup__image-title");
  const closeButtonPic = popupPic.querySelector(".popup__close-button");

  const newImage = cardElement.querySelector(".element__image");
  newImage.addEventListener("click", () => {
    popupImage.src = image;
    popupImage.alt = name;
    popupTitle.textContent = name;
    openPopup(popupPic);
  });

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  closeButtonPic.addEventListener("click", function () {
    closePopup(popupPic);
  });

  const likeButton = cardElement.querySelector(".element__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-button_active");
    console.log(likeButton.classList);
  });

  return cardElement;
}

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("element__like-button_active");
  });
});

function addCard(cardData) {
  const newCard = createCard(cardData.name, cardData.link);
  elementsContainer.prepend(newCard);
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    addCard(cardData);
  });
}

renderInitialCards();

formCard.addEventListener("submit", function (event) {
  console.log(predded);
  event.preventDefault();

  const name = titleInput.value;
  const url = linkInput.value;
  const newCard = createCard(name, url);
  console.log("Новая карточка:", name, url);
  elementsContainer.insertBefore(newCard, elementsContainer.firstChild);
  titleInput.value = "";
  linkInput.value = "";
  closePopup(popupCard);
});




setEventListeners(popupEditForm, popupEditSaveButton);
popupEditForm.addEventListener("submit", handleFormSubmit);

// Настройка слушателей для попапа создания карточки

setEventListeners(popupCardForm, popupCardSaveButton);
popupCardForm.addEventListener("submit", handleFormSubmit);

//закрытие попапов по таргету

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});