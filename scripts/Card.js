export class Card {

    constructor(data) {
      this.link = data.link;
      this.name = data.name;
    }

    _getTemplate() {
      this._cardTemplate = document.querySelector('.card-template').content;
      this._card = this._cardTemplate.querySelector('.card');
      this._cardElement = this._card.cloneNode(true);

      return this._cardElement;
    }

    _handleLikeClick() {
      this._cardLikeButton.classList.toggle('card__like_active');
  }
  
  _handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton = this._cardElement.querySelector('.card__like');
    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick());

    this._cardDeleteButton = this._cardElement.querySelector('.card__trash');
    this._cardDeleteButton.addEventListener('click', () => this._handleCardDelete());
  }


  createCard() {
    this._element = this._getTemplate();
    this.cardPhoto = this._element.querySelector('.card__photo');
    this.cardPhoto.src = this.link;
    this.cardPhoto.alt = this.name;
    this.cardName = this._element.querySelector('.card__text');
    this.cardName.textContent = this.name;

    this._setEventListeners();
  
    return this._element;
  }
}