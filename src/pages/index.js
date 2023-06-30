import './index.css';
import { FormValidator } from "../script/Formvalidator.js";
import { initialCards } from "../script/cards.js";
import { openPopup, closePopup, handleOverlayClick } from "../script/utils.js";
import Card from "../script/Card.js";
import Section from '../script/Section.js';
import Popup from "../script/Popup.js";
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description'
});


const userData = userInfo.getUserInfo();
console.log(userData);

userInfo.setUserInfo({
  name: 'Жак Ив Кусто',
  about: 'Исследователь океана'
});

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
const popupPictureView = document.querySelector(".popup_picture-view");
const popupImage = popupPictureView.querySelector(".popup__image");
const popupImageTitle = popupPictureView.querySelector(".popup__image-title");
const popupCardInstance = new Popup(".popup_card");
const popupCardForm = popupCard.querySelector(".popup__form");
const popupCardCloseButton = popupPictureView.querySelector(".popup__close-button_pic");

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, popupCardInstance);
    const cardElement = card.generateCard();
    return cardElement;
  }
}, ".elements");

section.renderItems();

function addCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, handleCardClick);
  card.setCloseButton(closeButtonPic); // Передайте элемент closeButtonPic
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
  closePopup(popupCard);
}

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

popupCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  addCard(cardData);
  popupCardForm.reset();
});
