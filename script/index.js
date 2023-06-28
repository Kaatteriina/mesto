import { openPopup, closePopup } from "./utils.js";
import FormValidator from "./Formvalidator.js";
import Section from "./Section.js";
import Card from "./Card.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const popupEdit = document.querySelector(".popup_edit");
const popupCard = document.querySelector(".popup_card");
const popupImage = document.querySelector(".popup_image");
const popupImageTitle = document.querySelector(".popup__image-title");
const cardTemplateSelector = "#card-template";
const elementsContainer = document.querySelector(".elements");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, popupCard, popupImage, popupImageTitle);
  return card.generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    }
  },
  elementsContainer
);

cardList.renderItems();

const profileFormValidator = new FormValidator(formConfig, popupEdit);
profileFormValidator.enableValidation();

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupEdit.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", () => {
  openPopup(popupCard);
});

const imageFormValidator = new FormValidator(formConfig, popupCard);
imageFormValidator.enableValidation();





