import './index.css';   
import { FormValidator } from "../components/validators/FormValidator.js";
import { initialCards } from "../components/classes/Card/data/cards.js";
import Card from "../components/classes/Card/Card.js";
import {
  profileForm,
  cardForm,
  cardTemplateSelector,
  popupImage,
  popupImageTitle,
  editButton,
  addButton,
} from '../components/constants/constants.js'
import Section from "../components/classes/Section/Section.js";
import UserInfo from "../components/classes/UserInfo/UserInfo.js";
import PopupWithImage from "../components/classes/popup/childs/PopupWithImage.js";
import PopupWithForm from "../components/classes/popup/childs/PopupWithForm.js";
import { formValidatorConfig } from "../components/config.js";


const profileFormValidator = new FormValidator(formValidatorConfig, profileForm);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);

const cardSection = new Section({items: initialCards, renderer: cardRenderer}, '.elements')
const popupPic = new PopupWithImage('.popup_picture-view')
const userInfoPopup = new PopupWithForm('.popup_edit', handleInfoFormSubmit,cardFormValidator)
const addCardPopup = new PopupWithForm('.popup_card', handleCardFormSubmit, cardFormValidator)
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__description'})




profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupPic.setEventListeners()
userInfoPopup.setEventListeners()
addCardPopup.setEventListeners()



editButton.addEventListener("click", function () {
  userInfoPopup.open()
  profileFormValidator.reset();

  const userInfoValues = userInfo.getUserInfo()

  userInfoPopup.$popup.querySelectorAll('input').forEach(($input) => {
    $input.value = userInfoValues[$input.name]
  })

});


addButton.addEventListener("click", function () {
  addCardPopup.open()
  
});


function handleCardFormSubmit(event, values) {
  event.preventDefault();
  addCard(values);
  const newCard = createCard(values);
  addCardToSection(newCard, cardSection);
  addCardPopup.close()
}


function handleInfoFormSubmit(event, values) {
  event.preventDefault();
  userInfo.setUserInfo(values);
  userInfoPopup.close()
}

function handleCardClick(src, caption) {
  popupPic.open(src, caption);
}

function createCard(itemData) {
  return new Card(itemData, cardTemplateSelector, popupPic, popupImage, popupImageTitle, handleCardClick);
}

function addCardToSection(card, section) {
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

// Создание карточек из массива initialCards
initialCards.forEach((itemData) => {
  const card = createCard(itemData);
  addCardToSection(card, cardSection);
});

// Добавление новой карточки



function cardRenderer(selector) {  

  return (itemData) => {
    const container = document.querySelector(selector)
    const cardElement = card.generateCard()
    container.prepend(cardElement)
  }
}

function addCard(cardData) {
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement)
}

function renderInitialCards() {
  initialCards.forEach((itemData) => {
    const card = createCard(itemData);
    addCardToSection(card, cardSection);
  });
  cardSection.renderAllElements();
}


