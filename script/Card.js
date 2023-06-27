import { openPopup, handlePictureClick  } from "./utils.js";

 export function handleImageClick(event) {
     const target = event.target;
     if (target.classList.contains("element__image")) {
       openPopup(popupCard);
     }
   }

 export default class Card {
   constructor(data, templateSelector, popupCard, popupImage, popupImageTitle) {
     this._name = data.name;
     this._image = data.link;
     this._templateSelector = templateSelector;
     this._popupCard = popupCard;
     this._popupImage = popupImage;
     this._popupImageTitle = popupImageTitle;
     this._element = this._getTemplate();
     this._imageElement = this._element.querySelector(".element__image");
     this._titleElement = this._element.querySelector(".element__title");
     this._likeButton = this._element.querySelector(".element__like-button");
     this._deleteButton = this._element.querySelector(".element__delete-button");

     this._setEventListeners();
   }

   _getTemplate() {
     const cardTemplate = document
       .querySelector(this._templateSelector)
       .content.querySelector(".element")
       .cloneNode(true);
     return cardTemplate;
   }

   _setEventListeners() {
     this._likeButton.addEventListener("click", () => {
       this._handleLikeClick();
     });

     this._deleteButton.addEventListener("click", () => {
       this._handleDeleteClick();
     });

     this._imageElement.addEventListener("click", (event) => {
       this._handleImageClick();
     });
   }

   _handleImageClick() {
     handlePictureClick(this._imageElement, this._titleElement);
   }


   _handleLikeClick() {
     this._likeButton.classList.toggle("element__like-button_active");
   }

   _handleDeleteClick() {
     this._element.remove();
   }

   generateCard() {
     this._imageElement.src = this._image;
     this._imageElement.alt = this._name;
     this._titleElement.textContent = this._name;

     return this._element;
   }
 }
