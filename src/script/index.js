import './../index.css';  
import { initialCards } from "./cards.js";
import {handleOverlayClick } from "./utils.js";
import Card from "./card.js";
import { FormValidator } from "./FormValidator.js";  
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"; 
import UserInfo from "./UserInfo.js"; 
import Section from "./Section.js"; // Импорт класса Section


// Конфигурация для валидации форм
const formValidatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Элементы форм и их валидаторы
const profileForm = document.querySelector(".popup_edit .popup__form");
const cardForm = document.querySelector(".popup_card .popup__form");

const profileFormValidator = new FormValidator(formValidatorConfig, profileForm);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Контейнер для карточек и другие элементы
const elementsContainer = document.querySelector(".elements");
const cardTemplateSelector = "#card-template";
const popupCard = document.querySelector(".popup_card");

// Создание экземпляра Section для управления карточками
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardTemplateSelector, handleCardClick);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  elementsContainer
);

cardList.renderItems();

// Создание экземпляра PopupWithImage
const popupPictureView = new PopupWithImage(".popup_picture-view");

// Обработчик клика по карточке
function handleCardClick(imageSrc, imageTitle) {
  popupPictureView.open(imageSrc, imageTitle);
}

// Добавление обработчика клика по попапу и закрытия попапа
popupCard.addEventListener("click", handleOverlayClick);

// Создание экземпляра PopupWithForm для попапа добавления карточки
const popupCardForm = new PopupWithForm({ popupSelector: ".popup_card" });

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event, name, link) {
  event.preventDefault();

  cardList.addItem({ name, link });
  popupCardForm.close();
}

popupCardForm.setFormSubmitHandler(handleCardFormSubmit);

// Добавление обработчика клика по попапу и закрытия попапа
popupCardForm.setEventListeners();

// Обработчики для попапа редактирования профиля
const popupEdit = new PopupWithForm({ popupSelector: ".popup_edit" });

popupEdit.setFormSubmitHandler((event) => {
  event.preventDefault();
  const newName = nameInput.value;
  const newAbout = aboutInput.value;

  userInfo.setUserInfo({ name: newName, about: newAbout });
  popupEdit.close();
});

// Добавление обработчика клика по попапу и закрытия попапа
popupEdit.setEventListeners();

// Обработчик клика по кнопке редактирования профиля
editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  profileFormValidator.reset();
  popupEdit.open();
});

// Создание экземпляра UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description"
});

// Получение данных пользователя и вывод в консоль
const userData = userInfo.getUserInfo();
console.log(userData);

// Установка данных пользователя
userInfo.setUserInfo({
  name: "Жак Ив Кусто",
  about: "Исследователь океана"
});
