import { Card } from './Card.js';
import { initialCards } from './cards.js';

const popups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupNewCardElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
const popupPhoto = popupImageElement.querySelector('.popup__image');
const popupCaption = popupImageElement.querySelector('.popup__caption');


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
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

document.addEventListener('keydown', closePopupByClickOnEsc);
document.removeEventListener('keyup', closePopupByClickOnEsc);

  const openPopupImage = (data) => {
  popupPhoto.src = data.link;
  popupPhoto.alt = data.name;
  popupCaption.textContent = data.name;

  openPopup(popupImageElement);
}

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const data = {
    link: inputLink.value,
    name: inputPlace.value
  }
  const cardElement = new Card(data);
  cardsListElement.prepend(cardElement.createCard());
  const popupSubmitButton = popupNewCardElement.querySelector('.popup__submit-button');
  closePopup(popupNewCardElement);
  evt.target.reset();
  disableSubmitButton(popupSubmitButton, selectors);
  cardElement.cardPhoto.addEventListener('click', () => openPopupImage(cardElement));
}


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

initialCards.forEach(item => {
  const card = new Card(item);
  const cardElement = card.createCard();
  cardsListElement.prepend(cardElement);
  card.cardPhoto.addEventListener('click', () => openPopupImage(card));
});