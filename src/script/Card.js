

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data.link, this._data.name);
    });
  }
  
  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}