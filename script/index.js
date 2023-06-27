import { FormValidator } from "./Formvalidator.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, handleOverlayClick } from "./utils.js";
import Card from "./Card.js";

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

function addCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, popupCard, popupImage, popupImageTitle);
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
const titleInput = popupCard.querySelector(".popup__input_type_title");
const linkInput = popupCard.querySelector(".popup__input_type_link");
const closeButtonPic = popupPictureView.querySelector(".popup__close-button_pic");

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
}

popupCard.querySelector(".popup__form").addEventListener("submit", handleCardFormSubmit);

popupPictureView.addEventListener("click", handleOverlayClick);
closeButtonPic.addEventListener("click", function () {
  closePopup(popupPictureView);
});




