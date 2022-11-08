// popups
const popupEditElement = document.querySelector('.popup_type_edit');
const popupNewCardElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
let popupPhoto = popupImageElement.querySelector('.popup__image');
let popupCaption = popupImageElement.querySelector('.popup__caption');

// popups close buttons
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__close');
const popupNewCardCloseButtonElement = popupNewCardElement.querySelector('.popup__close');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close');

//popups open buttons
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const cardsListElement = document.querySelector('.cards__list');


let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let popupFormEditElement = document.querySelector('.popup__form_type_edit');
let popupFormNewCardElement = document.querySelector('.popup__form_type_new-card');
let inputName = popupFormEditElement.querySelector('.popup__field_input_name');
let inputAbout = popupFormEditElement.querySelector('.popup__field_input_about');
let popupSubmitButtonElement = document.querySelector('.popup__submit-button');
let inputPlace = popupFormNewCardElement.querySelector('.popup__field_input_place');
let inputLink = popupFormNewCardElement.querySelector('.popup__field_input_link');


//arr cards

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


//functions
const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

const closePopupEditElementByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupEditElement);
}

const closePopupNewCardElementByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupNewCardElement);
}

const closePopupImageElementByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupImageElement);
}

const likeButtonActive = (evt) =>  {
    evt.target.classList.toggle('card__like_active');
}

const deleteHandler = (event) => {
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
  deleteButton.addEventListener('click', deleteHandler);
  const likeButton = cardElement.querySelector('.card__like');
  likeButton.addEventListener('click', likeButtonActive);
  const cardPhoto = cardElement.querySelector('.card__photo');
  cardPhoto.addEventListener('click', openPopupImage);
  popupImageCloseButtonElement.addEventListener('click', function() {
    closePopup(popupImageElement);
  });
  popupImageElement.addEventListener('click', closePopupImageElementByClickOnOverlay);
}

const createCard = (data) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardsListElement.prepend(cardElement);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardName = cardElement.querySelector('.card__text');
  
  cardPhoto.src = data.link;
  cardName.textContent = data.name;
  cardPhoto.alt = data.name;
  setEventListeners(cardElement);
  return cardElement;
}

const renderCard = (data, cardsListElement) => {
  const cardElement = createCard(data);
  cardsListElement.prepend(cardElement);
}

const submitForm = (evt) => {
  evt.preventDefault();
  const data = {
    link: inputLink.value,
    name: inputPlace.value
  }
  createCard(data);
  closePopup(popupNewCardElement);
  evt.target.reset();
}

initialCards.forEach(function(data) {
  cardsListElement.append(createCard(data));
});





let addProfileInfo = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditElement);
}



//event listeners
profileEditButtonElement.addEventListener('click', function() {
  openPopup(popupEditElement);
});

profileAddButtonElement.addEventListener('click', function() {
  openPopup(popupNewCardElement);
});

popupEditCloseButtonElement.addEventListener('click', function() {
  closePopup(popupEditElement);
});

popupNewCardCloseButtonElement.addEventListener('click', function() {
  closePopup(popupNewCardElement);
});

popupEditElement.addEventListener('click', closePopupEditElementByClickOnOverlay);

popupNewCardElement.addEventListener('click', closePopupNewCardElementByClickOnOverlay);

popupFormEditElement.addEventListener('submit', addProfileInfo);

popupFormNewCardElement.addEventListener('submit', submitForm);