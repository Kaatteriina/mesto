const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");
const nameInput = document.getElementById("name");
const aboutInput = document.getElementById("about");

const profileName = document.querySelector(".profile__name")
const profileDescription = document.querySelector(".profile__description")
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_card');
const closeButtonCard = popupCard.querySelector('.popup__close-button_card');



editButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

 profileName.textContent = nameInput.value;

  console.log("save button");

 profileDescription.textContent =
    aboutInput.value;

  popup.classList.remove("popup_opened");
});


addButton.addEventListener('click', function() {
  popupCard.classList.add('popup_opened');
});

closeButtonCard.addEventListener('click', function() {
  popupCard.classList.remove('popup_opened');
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
});


/* темплейт 6ти картинок и отображение их на сайте */

 const initialCards = [
  {
    name: 'Тории',
    link: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1953&q=80'
  },
  {
    name: 'Фудзи',
    link: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2092&q=80'
  },
  {
    name: 'Сибуя',
    link: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Сакура',
    link: 'https://images.unsplash.com/photo-1493589976221-c2357c31ad77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Переулок',
    link: 'https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80'
  },
  {
    name: 'Киото',
    link: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

function createCard(name, image) {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const titleElement = cardElement.querySelector('.element__title');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  

  imageElement.src = image;
  imageElement.alt = name;
  titleElement.textContent = name;

  const newImage = cardElement.querySelector('.element__image');
const popupPic = document.querySelector('.popup_picture-view');
const popupImage = popupPic.querySelector('.popup__image');
const popupTitle = popupPic.querySelector('.popup__image-title');



  newImage.addEventListener('click', () => {
    //console.log('BUM');
    const name = newImage.nextElementSibling.textContent;
    const src = newImage.getAttribute('src');
    popupImage.src = src;
    popupImage.alt = name;
    popupTitle.textContent = name;
    popupPic.classList.add('popup_opened');
  });


  
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  return cardElement;
}


  function addCard(cardData) {
    const newCard = createCard(cardData.name, cardData.link);
    elementsContainer.insertBefore(newCard, elementsContainer.firstChild);
}

function renderInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i]);
  }
}

renderInitialCards();

const titleInput = popupCard.querySelector('.popup__input_type_title');
const linkInput = popupCard.querySelector('.popup__input_type_link');
const saveButton = document.querySelector('.popup__save-button');
const formCard = document.getElementById('forma');
console.log('formcard:', formCard)

formCard.addEventListener("submit", function (event) {
  console.log('hello')
  event.preventDefault();
  
  const name = titleInput.value;
  const url = linkInput.value;
  const newCard = createCard(name, url);
  console.log("Новая карточка:", name, url);
  elementsContainer.insertBefore(newCard, elementsContainer.firstChild);
  titleInput.value = '';
  linkInput.value = '';  
  popupCard.classList.remove('popup_opened');
}); 

/* кнопка лайка */

// Добавляем обработчик события для каждой кнопки лайка
// Находим все кнопки лайка на странице
const likeButtons = document.querySelectorAll('.element__like-button');

// Добавляем обработчик события для каждой кнопки лайка
likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('_active');
  });
});

const images = document.querySelectorAll('.element__image');
const popupPic = document.querySelector('.popup_picture-view');
const popupImage = popupPic.querySelector('.popup__image');
const popupTitle = popupPic.querySelector('.popup__image-title');
const closeButtonPic = document.querySelector('.popup__close-button_pic');

images.forEach((image) => {
  image.addEventListener('click', () => {
    //console.log('Кнопка на изображении нажата');
    const name = image.nextElementSibling.textContent;
    const src = image.getAttribute('src');
    popupImage.src = src;
    popupImage.alt = name;
    popupTitle.textContent = name;
    popupPic.classList.add('popup_opened');
  });
});

closeButtonPic.addEventListener("click", function () {
  //console.log('closeButton')
  popupPic.classList.remove("popup_opened");
});







   


