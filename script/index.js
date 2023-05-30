const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector(".popup_card");
const closeButtonCard = popupCard.querySelector(".popup__close-button_card");

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
});

popupCloseButton.addEventListener("click", function () {
  closePopup(popupEdit);
});

popupForm.addEventListener("submit", function (event) {
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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/* темплейт 6ти картинок и отображение их на сайте */

const initialCards = [
  {
    name: "Тории",
    link: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1953&q=80",
  },
  {
    name: "Фудзи",
    link: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2092&q=80",
  },
  {
    name: "Сибуя",
    link: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Сакура",
    link: "https://images.unsplash.com/photo-1493589976221-c2357c31ad77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Переулок",
    link: "https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
  },
  {
    name: "Киото",
    link: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

const elementsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template");

function createCard(name, image) {
  const cardElement = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  const titleElement = cardElement.querySelector(".element__title");
  const deleteButton = cardElement.querySelector(".element__delete-button");
  const likeButton = cardElement.querySelector(".element__like-button");

  imageElement.src = image;
  imageElement.alt = name;
  titleElement.textContent = name;

  const popupPic = document.querySelector(".popup_picture-view");
  const popupImage = popupPic.querySelector(".popup__image");
  const popupTitle = popupPic.querySelector(".popup__image-title");
  const closeButtonPic = popupPic.querySelector(".popup__close-button");

  const newImage = cardElement.querySelector(".element__image");
  newImage.addEventListener("click", () => {
    popupImage.src = image;
    popupImage.alt = name;
    popupTitle.textContent = name;
    openPopup(popupPic);
  });

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("_active");
  });

  closeButtonPic.addEventListener("click", function () {
    closePopup(popupPic);
  });

  return cardElement;
}

// Добавляем обработчик события для каждой кнопки лайка
const likeButtons = document.querySelectorAll(".element__like-button");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("_active");
  });
});

function addCard(cardData) {
  const newCard = createCard(cardData.name, cardData.link);
  elementsContainer.prepend(newCard);
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    addCard(cardData);
  });
}

renderInitialCards();

const titleInput = popupCard.querySelector(".popup__input_type_title");
const linkInput = popupCard.querySelector(".popup__input_type_link");
const saveButton = document.querySelector(".popup__save-button");
const formCard = document.getElementById("forma");

formCard.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = titleInput.value;
  const url = linkInput.value;
  const newCard = createCard(name, url);
  console.log("Новая карточка:", name, url);
  elementsContainer.insertBefore(newCard, elementsContainer.firstChild);
  titleInput.value = "";
  linkInput.value = "";
  closePopup(popupCard);
});
