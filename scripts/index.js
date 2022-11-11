const popups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupNewCardElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
const popupPhoto = popupImageElement.querySelector('.popup__image');
const popupCaption = popupImageElement.querySelector('.popup__caption');
const cardTemplate = document.querySelector('.card-template').content;
const card = cardTemplate.querySelector('.card');

const closeButtons = document.querySelectorAll('.popup__close');

const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const cardsListElement = document.querySelector('.cards__list');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupFormEditElement = document.querySelector('.popup__form_type_edit');
const popupFormNewCardElement = document.querySelector('.popup__form_type_new-card');
const inputName = popupFormEditElement.querySelector('.popup__field_input_name');
const inputAbout = popupFormEditElement.querySelector('.popup__field_input_about');
const inputPlace = popupFormNewCardElement.querySelector('.popup__field_input_place');
const inputLink = popupFormNewCardElement.querySelector('.popup__field_input_link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

const closePopupByCloseButton = function(event) {
  const target = event.target;
  const currentTarget = target.closest('.popup');
  currentTarget.classList.remove('popup_opened');
}

closeButtons.forEach(function(closeButtonElement) {
  closeButtonElement.addEventListener('click', closePopupByCloseButton);
});

const closePopupByClickOnOverlay = event => {
  const target = event.target;
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(target);
}

popups.forEach(function(popupElement) {
  popupElement.addEventListener('click', closePopupByClickOnOverlay);
});

const handlerLikeClick = (evt) =>  {
    evt.target.classList.toggle('card__like_active');
}

const handlerCardDelete = (event) => {
  const target = event.target;
  const currentCardElement = target.closest('.card');
  currentCardElement.remove();
}

const openPopupImage = (event) => {
  const target = event.target;
  const currentCardElement = target.closest('.card');
  const currentCardPhoto = currentCardElement.querySelector('.card__photo');
  const currentCardName = currentCardElement.querySelector('.card__text');
  popupPhoto.src = currentCardPhoto.src;
  popupPhoto.alt = currentCardPhoto.alt;
  popupCaption.textContent = currentCardName.textContent;

  openPopup(popupImageElement);
}

const setEventListeners = (cardElement) => {
  const deleteButton = cardElement.querySelector('.card__trash');
  deleteButton.addEventListener('click', handlerCardDelete);
  const likeButton = cardElement.querySelector('.card__like');
  likeButton.addEventListener('click', handlerLikeClick);
  const cardPhoto = cardElement.querySelector('.card__photo');
  cardPhoto.addEventListener('click', openPopupImage);
}

const createCard = (data) => {
  const cardElement = card.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardName = cardElement.querySelector('.card__text');
  cardPhoto.src = data.link;
  cardName.textContent = data.name;
  cardPhoto.alt = data.name;
  setEventListeners(cardElement);
  return cardElement;
}

const handlerCardFormSubmit = (evt) => {
  evt.preventDefault();
  const data = {
    link: inputLink.value,
    name: inputPlace.value
  }
  const cardElement = createCard(data);
  cardsListElement.prepend(cardElement);
  closePopup(popupNewCardElement);
  evt.target.reset();
}

initialCards.forEach(function(data) {
  cardsListElement.append(createCard(data));
});

const handlerProfileFormSubmit = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditElement);
}

profileEditButtonElement.addEventListener('click', function() {
  openPopup(popupEditElement);
  inputName.textContent = profileName.value;
  inputAbout.textContent = profileAbout.value;
});

profileAddButtonElement.addEventListener('click', function() {
  openPopup(popupNewCardElement);
});

popupFormEditElement.addEventListener('submit', handlerProfileFormSubmit);

popupFormNewCardElement.addEventListener('submit', handlerCardFormSubmit);