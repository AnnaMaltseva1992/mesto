const popups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupNewCardElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
const popupPhoto = popupImageElement.querySelector('.popup__image');
const popupCaption = popupImageElement.querySelector('.popup__caption');
const cardTemplate = document.querySelector('.card-template').content;
const card = cardTemplate.querySelector('.card');

const popupCloseButtons = document.querySelectorAll('.popup__close');

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

const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('keydown', closePopupByClickOnEsc);
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('keydown', closePopupByClickOnEsc);
}

const closePopupByCloseButton = function(event) { 
  const target = event.target; 
  const popup = target.closest('.popup'); 
  closePopup(popup); 
} 

popupCloseButtons.forEach(function(popupCloseButtonElement) {
  popupCloseButtonElement.addEventListener('click', closePopupByCloseButton);
});

const closePopupByClickOnOverlay = event => {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
}

popups.forEach(function(popupElement) {
  popupElement.addEventListener('click', closePopupByClickOnOverlay);
});

const closePopupByClickOnEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

document.addEventListener('keydown', closePopupByClickOnEsc);
document.removeEventListener('keyup', closePopupByClickOnEsc);

const handleLikeClick = (evt) =>  {
    evt.target.classList.toggle('card__like_active');
}

const handleCardDelete = (event) => {
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
  const cardDeleteButton = cardElement.querySelector('.card__trash');
  cardDeleteButton.addEventListener('click', handleCardDelete);
  const cardLikeButton = cardElement.querySelector('.card__like');
  cardLikeButton.addEventListener('click', handleLikeClick);
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

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const data = {
    link: inputLink.value,
    name: inputPlace.value
  }
  const cardElement = createCard(data);
  cardsListElement.prepend(cardElement);
  const popupSubmitButton = popupNewCardElement.querySelector('.popup__submit-button');
  closePopup(popupNewCardElement);
  evt.target.reset();
  disableSubmitButton(popupSubmitButton, selectors);
}

const disableSubmitButton = function(buttonElement, selectors) {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(selectors.inactiveButtonClass);
}

initialCards.forEach(function(data) {
  cardsListElement.append(createCard(data));
});

const handleProfileFormSubmit = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditElement);
}

profileEditButtonElement.addEventListener('click', function() {
  openPopup(popupEditElement);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

profileAddButtonElement.addEventListener('click', function() {
  openPopup(popupNewCardElement);
});

popupFormEditElement.addEventListener('submit', handleProfileFormSubmit);

popupFormNewCardElement.addEventListener('submit', handleCardFormSubmit);

enableValidation(selectors);




