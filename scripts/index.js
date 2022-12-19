import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupNewCardElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
const popupPhoto = popupImageElement.querySelector('.popup__image');
const popupCaption = popupImageElement.querySelector('.popup__caption');

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

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
  formSection: '.popup__form-section',
  inputInvalidClass: 'popup__field_invalid'
}

const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})

const closePopupByClickOnEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleCardClick(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupCaption.textContent = name;

  openPopup(popupImageElement);
}

function createCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);
  return card.createCard();
}

initialCards.forEach(item => {
  const cardElement = createCard(item);
  cardsListElement.append(cardElement);
});

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const data = {
    link: inputLink.value,
    name: inputPlace.value
  }
  const cardElement = createCard(data);
  cardsListElement.prepend(cardElement);
  closePopup(popupNewCardElement);
  evt.target.reset();

  formNewCardValidator.disableSubmitButton();
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
  formEditValidator.resetValidation();
});

profileAddButtonElement.addEventListener('click', function() {
  openPopup(popupNewCardElement);
  formNewCardValidator.resetValidation();
});

popupFormEditElement.addEventListener('submit', handleProfileFormSubmit);

popupFormNewCardElement.addEventListener('submit', handleCardFormSubmit);

const formEditValidator = new FormValidator(selectors, popupFormEditElement);
formEditValidator.enableValidation();

const formNewCardValidator = new FormValidator(selectors, popupFormNewCardElement);
formNewCardValidator.enableValidation();