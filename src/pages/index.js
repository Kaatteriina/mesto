import './index.css';   
import { FormValidator } from "../script/validators/FormValidator.js";
import { initialCards } from "../script/classes/Card/data/cards.js";
import Card from "../script/classes/Card/Card.js";
import {
  profileForm,
  cardForm,
  cardTemplateSelector,
  popupImage,
  popupImageTitle,
  editButton,
  addButton,
} from '../script/constants/constants.js'
import Section from "../script/classes/Section/Section.js";
import UserInfo from "../script/classes/UserInfo/UserInfo.js";
import PopupWithImage from "../script/classes/popup/childs/PopupWithImage.js";
import PopupWithForm from "../script/classes/popup/childs/PopupWithForm.js";
import { formValidatorConfig } from "../script/config.js";


const profileFormValidator = new FormValidator(formValidatorConfig, profileForm);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);

const cardSection = new Section({items: initialCards, renderer: cardRenderer}, '.elements')
const popupPic = new PopupWithImage('.popup_picture-view')
const userInfoPopup = new PopupWithForm('.popup_edit', handleInfoFormSubmit)
const addCardPopup = new PopupWithForm('.popup_card', handleCardFormSubmit)
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__description'})




profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupPic.setEventListeners()
userInfoPopup.setEventListeners()
addCardPopup.setEventListeners()



renderInitialCards();

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
  cardFormValidator.reset();
});


function handleCardFormSubmit(event, values) {
  event.preventDefault();
  addCard(values);
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


function cardRenderer(selector) {  

  return (itemData) => {

    

    const container = document.querySelector(selector)
    const card = new Card(itemData, cardTemplateSelector, popupPic, popupImage, popupImageTitle, handleCardClick);
    const cardElement = card.generateCard()
    container.prepend(cardElement)
  }
}

function addCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, popupPic, popupImage, popupImageTitle, handleCardClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement)
}

function renderInitialCards() {
  cardSection.renderAllElements()
}




