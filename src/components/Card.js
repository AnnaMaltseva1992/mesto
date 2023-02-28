export default class Card {

  constructor({ data, handleCardClick, handleLikeClick, handleDeleteButtonClick },
    templateSelector, userId) {
    this.link = data.link;
    this.name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._userId = userId;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    
    this._element = this._getTemplate();

    this.cardPhoto = this._element.querySelector('.card__photo');
    this.cardName = this._element.querySelector('.card__text');
    this._cardLikeButton = this._element.querySelector('.card__like');
    this._cardDeleteButton = this._element.querySelector('.card__trash');
    this._likesCounter = this._element.querySelector('.card__count');

    
  }

  _getTemplate() {
    this._cardElement = document
    .querySelector(this._templateSelector).content
    .querySelector('.card')
    .cloneNode(true);

    return this._cardElement;
  }

  handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick(this));
  
    this._cardDeleteButton.addEventListener('click', () => this._handleDeleteButtonClick(this._element));

    this.cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }


  createCard() {
    this.cardPhoto.src = this.link;
    this.cardPhoto.alt = this.name;
    this.cardName.textContent = this.name;
  
    this.setMyLike(this._likes);

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.remove();
    } 
  
    this._setEventListeners();

    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  setLike() {
    this._cardLikeButton.classList.add('card__like_active');
  }

  removeLike() {
    this._cardLikeButton.classList.remove('card__like_active');
  } 

  setMyLike(newLikes) {
    this._likes = newLikes;
    this._likesCounter.textContent = this._likes.length;
    if(this.isLiked()) {
      this.setLike();
  } else {
    this.removeLike();
  }
  } 
}




