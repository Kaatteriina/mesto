import './index.css';
import { FormValidator } from '../components/validators/FormValidator.js';
import { initialCards } from '../components/classes/Card/data/cards.js';
import Card from '../components/classes/Card/Card.js';
import {
  profileForm,
  cardForm,
  cardTemplateSelector,
  popupImage,
  popupImageTitle,
  editButton,
  addButton,
} from '../components/constants/constants.js';
import Section from '../components/classes/Section/Section.js';
import UserInfo from '../components/classes/UserInfo/UserInfo.js';
import PopupWithImage from '../components/classes/popup/childs/PopupWithImage.js';
import PopupWithForm from '../components/classes/popup/childs/PopupWithForm.js';
import { formValidatorConfig } from '../components/config.js';

// Создаем экземпляры валидаторов
const profileFormValidator = new FormValidator(formValidatorConfig, profileForm);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);

// Создаем секцию для карточек и рендерим начальные карточки
const cardSection = new Section({ items: initialCards, renderer: cardRenderer }, '.elements');


// Создаем экземпляры попапов и объекта для управления информацией о пользователе
const popupPic = new PopupWithImage('.popup_picture-view');
const userInfoPopup = new PopupWithForm('.popup_edit', handleInfoFormSubmit);
const addCardPopup = new PopupWithForm('.popup_card', handleCardFormSubmit);
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__description',
});

// Включаем валидацию для форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Устанавливаем слушатели событий для попапов
popupPic.setEventListeners();
userInfoPopup.setEventListeners();
addCardPopup.setEventListeners();

// Обработчик кнопки редактирования профиля
editButton.addEventListener('click', function () {
  userInfoPopup.open();

  const userInfoValues = userInfo.getUserInfo();

  userInfoPopup.$popup.querySelectorAll('input').forEach(($input) => {
    $input.value = userInfoValues[$input.name];
  });
});

// Обработчик кнопки добавления карточки
addButton.addEventListener('click', function () {
  addCardPopup.open();
});



// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event, values) {
  event.preventDefault();
  addCard(values);
  addCardPopup.close();
}

// Обработчик отправки формы редактирования профиля
function handleInfoFormSubmit(event, values) {
  event.preventDefault();
  userInfo.setUserInfo(values);
  userInfoPopup.close();
}

// Обработчик клика на изображение карточки
function handleCardClick(src, caption) {
  popupPic.open(src, caption);
}

// Функция создания карточки
function createCard(itemData) {
  return new Card(itemData, cardTemplateSelector, popupPic, popupImage, popupImageTitle, handleCardClick);
}

// Функция добавления карточки в секцию
function addCardToSection(card, section) {
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

// Создание карточек из массива initialCards
initialCards.forEach((itemData) => {
  const card = createCard(itemData);
  addCardToSection(card, cardSection);
});

// Функция-рендерер для добавления карточки в секцию
function cardRenderer(selector) {
  return (itemData) => {
    const container = document.querySelector(selector);
    const card = createCard(itemData);
    const cardElement = card.generateCard();
    container.prepend(cardElement);
  };
}

// Функция добавления карточки в секцию
function addCard(cardData) {
  const newCard = createCard(cardData);
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
}
