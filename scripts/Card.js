export class Card {

    constructor(data, templateSelector, handleCardClick) {
      this.link = data.link;
      this.name = data.name;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      this._cardElement = document
      .querySelector(this._templateSelector).content
      .querySelector('.card')
      .cloneNode(true);

      return this._cardElement;
    }

    _handleLikeClick() {
      this._cardLikeButton.classList.toggle('card__like_active');
  }
  
  _handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick());
    
    this._cardDeleteButton.addEventListener('click', () => this._handleCardDelete());

    this.cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this.cardPhoto = this._element.querySelector('.card__photo');
    this._cardLikeButton = this._cardElement.querySelector('.card__like');
    this._cardDeleteButton = this._cardElement.querySelector('.card__trash');
    this.cardPhoto.src = this.link;
    this.cardPhoto.alt = this.name;
    this.cardName = this._element.querySelector('.card__text');
    this.cardName.textContent = this.name;

    this._setEventListeners();
  
    return this._element;
  }
}