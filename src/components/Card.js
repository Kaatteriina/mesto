
export default class Card {
  constructor(data, templateSelector, popupCard,
     popupImage, popupDelete, popupImageTitle, 
     handleCardClick, userId, likeClickHandler, dislikesClickHandler) {
    this._name = data.name;
    this._image = data.link;
    this._cardData = data
    this._templateSelector = templateSelector;
    this._popupCard = popupCard;
    this._popupImage = popupImage;
    this._popupImageTitle = popupImageTitle;
    this._popupDelete = popupDelete;
    this.likeClickHandler = likeClickHandler
    this.dislikesClickHandler = dislikesClickHandler
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._titleElement = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeCount = this._element.querySelector(".element__like-count");
    this._likeCount.textContent = data.likes.length
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this.handleCardClick = handleCardClick
    

    if (data.owner._id !== userId) {
      this._deleteButton.remove();
    }

    const isUserLiked = data.likes.find(like => like._id === userId);

    if(isUserLiked) {
      this._likeButton.classList.add('element__like-button_active');
    }


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
      this.handleLikeClick();
    });
  
    this._deleteButton.addEventListener("click", () => {
      this.handleDeleteClick();
    });
  
    this._imageElement.addEventListener("click", () => {
      this.handleCardClick(this._image, this._name);
    });
  }
  
  handleLikeClick() {
    const isLiked = this._likeButton.classList.toggle("element__like-button_active");
    


    if (isLiked) {

      this.likeClickHandler(likeCount => {
        this._likeCount.textContent = likeCount
      });


    } else {
      this.dislikesClickHandler(likeCount => {
        this._likeCount.textContent = likeCount
      })

    }
  }

  handleDeleteClick() {
    this._popupDelete._getInputValues = () => ({ element: this._element, card: this._cardData });
    this._popupDelete.open();
  }

  generateCard() {
    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    return this._element;
  }
}

  
  
