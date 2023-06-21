import { FormValidator } from "./formvalidator.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, handleOverlayClick, handlePictureClick, handlePictureOverlayClick } from './utils.js';
import Card from "./card.js";

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

const profileFormValidator = new FormValidator(
formValidatorConfig,
profileForm
);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const elementsContainer = document.querySelector(".elements");
const cardTemplateSelector = "#card-template";
const popupCard = document.querySelector(".popup_card");

function addCard(cardData) {
const card = new Card(cardData, cardTemplateSelector, popupCard);
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

popupCard.addEventListener("click", handleOverlayClick);
popupEdit.addEventListener("click", handleOverlayClick);
editButton.addEventListener("click", function () {
openPopup(popupEdit);
nameInput.value = profileName.textContent;
aboutInput.value = profileDescription.textContent;
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
});

closeButtonCard.addEventListener("click", function () {
closePopup(popupCard);
});

const titleInput = popupCard.querySelector(".popup__input_type_title");
const linkInput = popupCard.querySelector(".popup__input_type_link");
const popupCardForm = popupCard.querySelector(".popup__form");



function handleCardFormSubmit(event) {
event.preventDefault();

const name = titleInput.value;
const url = linkInput.value;

addCard({ name, link: url });

}

popupCardForm.addEventListener("submit", handleCardFormSubmit);

const popupPictureView = document.querySelector(".popup_picture-view");
const closeButtonPic = popupPictureView.querySelector(".popup__close-button_pic");

popupPictureView.addEventListener("click", handlePictureOverlayClick);
closeButtonPic.addEventListener("click", function () {
closePopup(popupPictureView);
});

elementsContainer.addEventListener("click", handlePictureClick);
