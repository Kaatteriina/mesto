import { enableValidation, setEventListeners  } from './validation.js';

import { initialCards } from './cards.js';

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close-button");
const popupEditForm = popupEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector(".popup_card");
const closeButtonCard = popupCard.querySelector(".popup__close-button_card");

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
});

popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEdit);
});

popupEditForm.addEventListener("submit", function () {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closePopup(popupEdit);
});


addButton.addEventListener("click", function () {
  openPopup(popupCard);
});

closeButtonCard.addEventListener("click", function () {
  closePopup(popupCard);
});

function hideInputError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}



function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);

  if (popup === popupCard) {
    resetPopupCardForm();
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const elementsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template");

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

// Добавляем обработчик события для каждой кнопки лайка
const likeButtons = document.querySelectorAll(".element__like-button");

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

const titleInput = popupCard.querySelector(".popup__input_type_title");
const linkInput = popupCard.querySelector(".popup__input_type_link");

// Функция сброса состояния формы попапа popupCard
function resetPopupCardForm() {
  const form = popupCard.querySelector(".popup__form");
  const saveButton = form.querySelector(".popup__save-button");
  const inputs = form.querySelectorAll(".popup__input");

  // Сброс состояния кнопки
  saveButton.classList.add("popup__save-button_disabled");
  saveButton.disabled = true;

  // Сброс состояния полей ввода
  inputs.forEach((input) => {
    input.value = "";
    hideInputError(input);
  });
}

// Настройка слушателей для попапа редактирования
const popupEditSaveButton = popupEditForm.querySelector(".popup__save-button");
setEventListeners(popupEditForm, popupEditSaveButton);


// Настройка слушателей для попапа создания карточки
const popupCardForm = popupCard.querySelector(".popup__form");
const popupCardSaveButton = popupCardForm.querySelector(".popup__save-button");
setEventListeners(popupCardForm, popupCardSaveButton);


// Обработчик отправки формы попапа карточки
function handleCardFormSubmit(event) {
  event.preventDefault();

  const name = titleInput.value;
  const url = linkInput.value;

  addCard({ name, link: url });

  titleInput.value = "";
  linkInput.value = "";

  closePopup(popupCard);
}

// Закрытие попапов по таргету
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

popupCardForm.addEventListener("submit", handleCardFormSubmit);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});