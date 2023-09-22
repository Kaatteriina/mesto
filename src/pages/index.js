import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  profileForm,
  cardForm,
  cardTemplateSelector,
  popupImage,
  popupImageTitle,
  editButton,
  addButton,
  updatePicForm,
} from "../components/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { formValidatorConfig } from "../components/config.js";
import Api from "../components/Api";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "e6c3f8c1-30bc-48fa-80de-fb60093cc841",
    "Content-Type": "application/json",
  },
});

// Создаем экземпляры валидаторов
const profileFormValidator = new FormValidator(
  formValidatorConfig,
  profileForm
);
const cardFormValidator = new FormValidator(formValidatorConfig, cardForm);
const updatePicFormValidator = new FormValidator(
  formValidatorConfig,
  updatePicForm
);

// Создаем секцию для карточек и рендерим начальные карточки

let initialCards = [];

api.getAllCards()
  .then((cards) => {
    initialCards = cards.reverse(); // Разворачиваем массив начальных карточек
    initialCards.forEach((itemData) => {
      const card = createCard(itemData);
      addCardToSection(card, cardSection);
    });
  });


const cardSection = new Section(
  { items: initialCards, renderer: cardRenderer },
  ".elements"
);

initialCards.forEach((itemData) => {
  const card = createCard(itemData);
  cardSection.addItem(card.generateCard());
});

// Создаем экземпляры попапов и объекта для управления информацией о пользователе
const popupPic = new PopupWithImage(".popup_picture-view");
const userInfoPopup = new PopupWithForm(".popup_edit", handleInfoFormSubmit);
const addCardPopup = new PopupWithForm(".popup_card", handleCardFormSubmit);
const deleteCardPopup = new PopupWithForm(
  ".popup_delete",
  handleDeleteCardFormSubmit
);
const updatePicPopup = new PopupWithForm(
  ".popup_update",
  handleUpdatePicFormSubmit
);
const userInfo = new UserInfo({
  profileAvatarSelector: ".profile__avatar",
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__description",
});


const profileOverlay = document.querySelector(".profile__overlay");

profileOverlay.addEventListener("click", () => {
  updatePicPopup.open();
});

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userInfoData, cards]) => {
    const { name, about, avatar } = userInfoData;
    userInfo.setUserInfo({ name, about, avatar });
    cardSection.renderAllElements(cards);
  })
  .catch(error => {
    console.error('Ошибка загрузки данных:', error);
  });

// Включаем валидацию для форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
updatePicFormValidator.enableValidation();

// Устанавливаем слушатели событий для попапов
popupPic.setEventListeners();
userInfoPopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
updatePicPopup.setEventListeners();

// Обработчик кнопки редактирования профиля
editButton.addEventListener("click", function () {
  const userInfoValues = userInfo.getUserInfo();
  userInfoPopup.setFormValues(userInfoValues);
  userInfoPopup.open();
});

// Обработчик кнопки добавления карточки
addButton.addEventListener("click", function () {
  addCardPopup.open();
});

function handleUpdatePicFormSubmit(event, values) {
  event.preventDefault();
  renderLoading(event.target.querySelector(".popup__save-button"), true);

  console.log(event.target.querySelector(".popup__save-button"));
  api.updateAvatar({ avatar: values.link }).then((data) => {
    userInfo._profileAvatar.src = data.avatar;
    renderLoading(event.target.querySelector(".popup__save-button"), false);
    updatePicPopup.close();
  });
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event, values) {
  event.preventDefault();

  api.createCard(values).then((data) => {
    addCard(data);
    addCardPopup.close();
  });
}

function renderLoading(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}


// Обработчик отправки формы редактирования профиля
function handleInfoFormSubmit(event, values) {
  event.preventDefault();
  renderLoading(event.target.querySelector(".popup__save-button"), true);

  userInfo.setUserInfo({ ...values, avatar: userInfo._profileAvatar.src });
  api.editUserInfo(values).then(() => {
    renderLoading(event.target.querySelector(".popup__save-button"), false);

    userInfoPopup.close();
  });
}

function handleDeleteCardFormSubmit(event, cardInfo) {
  event.preventDefault();

  api.deleteCard(cardInfo.card._id).then(() => {
    cardInfo.element.remove();
    deleteCardPopup.close();
  });
}

// Обработчик клика на изображение карточки
function handleCardClick(src, caption) {
  popupPic.open(src, caption);
}

// Функция создания карточки
function createCard(itemData) {
  return new Card(
    itemData,
    cardTemplateSelector,
    popupPic,
    popupImage,
    deleteCardPopup,
    popupImageTitle,
    handleCardClick
  );
}

// Функция добавления карточки в секцию
function addCardToSection(card, section) {
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

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
