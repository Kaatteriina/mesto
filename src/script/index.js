
import './../index.css';  
import { initialCards } from "./cards.js";
import { openPopup, closePopup, handleOverlayClick } from "./utils.js";
import Card from "./card.js";
import { FormValidator } from "./FormValidator.js";  
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"; 
import UserInfo from "./UserInfo.js"; 

const formValidatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileForm = document.querySelector(".popup_edit .popup__form");
const cardForm = document.querySelector(".popup_card .popup__form");

const profileFormValidator = new FormValidator(formValidatorConfig, profileForm);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const elementsContainer = document.querySelector(".elements");
const cardTemplateSelector = "#card-template";
const popupCard = document.querySelector(".popup_card");

function addCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, handleCardClick); //NEW
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
  closePopup(popupCard);
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    addCard(cardData);
  });
}

renderInitialCards();

function handleCardClick(imageSrc, imageTitle) {
  popupPictureView.open(imageSrc, imageTitle);
}  //NEW

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close-button");
const popupEditForm = popupEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const closeButtonCard = popupCard.querySelector(".popup__close-button_card");
const titleInput = popupCard.querySelector(".popup__input_type_title");
const linkInput = popupCard.querySelector(".popup__input_type_link");

const popupPictureView = new PopupWithImage(".popup_picture-view");

popupCard.addEventListener("click", handleOverlayClick);
popupEdit.addEventListener("click", handleOverlayClick);

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  profileFormValidator.reset();
});

popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEdit);
});

popupEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup(popupEdit);
});

addButton.addEventListener("click", function () {
  openPopup(popupCard);
  cardFormValidator.reset();
});

closeButtonCard.addEventListener("click", function () {
  closePopup(popupCard);
});

function handleCardFormSubmit(event) {
  event.preventDefault();

  const name = titleInput.value;
  const url = linkInput.value;

  addCard({ name, link: url });
  closePopup(popupCard);
}

popupCard.querySelector(".popup__form").addEventListener("submit", handleCardFormSubmit);

popupPictureView.setEventListeners(); // Добавление обработчиков для PopupWithImage

function handleImageClick(event) {
  const target = event.target;
  if (target.classList.contains("element__image")) {
    const cardElement = target.closest(".element");
    const imageElement = cardElement.querySelector(".element__image");
    const titleElement = cardElement.querySelector(".element__title");
    popupPictureView.open(imageElement.src, titleElement.textContent);
  }
}

elementsContainer.addEventListener("click", handleImageClick);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description"
});

// Используйте методы getUserInfo и setUserInfo для работы с данными пользователя
const userData = userInfo.getUserInfo();
console.log(userData);

userInfo.setUserInfo({
  name: "Новое имя",
  about: "Новая информация о себе"
});
