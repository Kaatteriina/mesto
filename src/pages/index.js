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
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { formValidatorConfig } from "../utils/config.js";
import Api from "../components/Api";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "e6c3f8c1-30bc-48fa-80de-fb60093cc841",
    "Content-Type": "application/json",
  },
});

let userId = "";

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

let cardSection = null;

const userInfo = new UserInfo({
  profileAvatarSelector: ".profile__avatar",
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__description",
});

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userInfoData, cards]) => {
    const { name, about, avatar } = userInfoData;
    userInfo.setUserInfo({ name, about, avatar });

    userId = userInfoData._id;

    cardSection = new Section(
      { items: cards.reverse(), renderer: cardRenderer },
      ".elements"
    );
    cardSection.renderAllElements();
  })
  .catch((error) => {
    console.error("Ошибка загрузки данных:", error);
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

const profileOverlay = document.querySelector(".profile__overlay");

profileOverlay.addEventListener("click", () => {
  updatePicPopup.open();
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

  api.updateAvatar({ avatar: values.link }).then((data) => {
    userInfo._profileAvatar.src = data.avatar;
    renderLoading(event.target.querySelector(".popup__save-button"), false);
    updatePicPopup.close();
  })
  .catch((err) => {
    console.error(err);
  });
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event, values) {
  event.preventDefault();

  api.createCard(values).then((data) => {
    cardRenderer(cardSection.container)(data);
    addCardPopup.close();
  })
  .catch((err) => {
    console.error(err);
  });
}
// Обработчик отправки формы редактирования профиля
function handleInfoFormSubmit(event, values) {
  event.preventDefault();
  renderLoading(event.target.querySelector(".popup__save-button"), true);

  api
    .editUserInfo(values)
    .then(() => {
      userInfo.setUserInfo({ ...values, avatar: userInfo._profileAvatar.src });
      renderLoading(event.target.querySelector(".popup__save-button"), false);

      userInfoPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteCardFormSubmit(event, cardInfo) {
  event.preventDefault();

  api
    .deleteCard(cardInfo.card._id)
    .then(() => {
      cardInfo.element.remove();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

// Обработчик клика на изображение карточки
function handleCardClick(src, caption) {
  popupPic.open(src, caption);
}

function handleLikeClick(cardId) {
  return (callback) => {
    let likeCount = 0;
    api.likeCard(cardId).then((cardData) => {
      likeCount = cardData.likes.length;
      callback(likeCount);
    })
    .catch((err) => {
      console.error(err);
    });
  };
}

function handleDislikesClick(cardId) {
  return (callback) => {
    let likeCount = 0;
    api.unlikeCard(cardId).then((cardData) => {
      likeCount = cardData.likes.length;
      callback(likeCount);
    })
    .catch((err) => {
      console.error(err);
    });
  };
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
    handleCardClick,
    userId,
    handleLikeClick(itemData._id),
    handleDislikesClick(itemData._id)
  );
}

  

// Функция-рендерер для добавления карточки в секцию
function cardRenderer(container) {
  return (itemData) => {
    const card = createCard(itemData);
    const cardElement = card.generateCard();
    container.prepend(cardElement);
  };
}
function addCard(cardData) { 
    const newCard = createCard(cardData); 
    const cardElement = newCard.generateCard(); 
    cardSection.addItem(cardElement); 
  } 