// Card.js
export default class Card {
    constructor(data, templateSelector, popupCard) {
      this._name = data.name;
      this._image = data.link;
      this._templateSelector = templateSelector;
      this._popupCard = popupCard;
      
    }
  
    _getTemplate() {
      const cardTemplate = document
        .querySelector(this._templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);
      return cardTemplate;
    }
  
    _setEventListeners() {
      const deleteButton = this._element.querySelector('.element__delete-button');
      const likeButton = this._element.querySelector('.element__like-button');
      const imageElement = this._element.querySelector('.element__image');
  
      deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
  
      likeButton.addEventListener('click', () => {
        this._toggleLike();
      });
  
      imageElement.addEventListener('click', () => {
        this._handleImageClick();
      });
    }
  
    _deleteCard() {
      this._element.remove();
    }
  
    _toggleLike() {
      const likeButton = this._element.querySelector('.element__like-button');
      likeButton.classList.toggle('element__like-button_active');
    }
  
    _handleImageClick() {
      popupImage.src = this._image;
      popupImage.alt = this._name;
      popupTitle.textContent = this._name;
      openPopup(popupPic, this._popupCard);
    }
  
    generateCard() {
      this._element = this._getTemplate();
      const imageElement = this._element.querySelector('.element__image');
      const titleElement = this._element.querySelector('.element__title');
  
      imageElement.src = this._image;
      imageElement.alt = this._name;
      titleElement.textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    }
  }
  
  
  
  
  