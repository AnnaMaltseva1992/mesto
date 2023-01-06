import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const popupFormEditElement = document.querySelector('.popup__form_type_edit');
const inputName = popupFormEditElement.querySelector('.popup__field_input_name');
const inputAbout = popupFormEditElement.querySelector('.popup__field_input_about');
const popupFormNewCardElement = document.querySelector('.popup__form_type_new-card');

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

function createCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);
  return card.createCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

const section = new Section({ 
  items: initialCards, 
  renderer: renderCard }, 
  '.cards__list');

section.renderItems();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCardFormSubmit() {
    renderCard({
      link: inputLink.value,
      name: inputPlace.value
    });

  popupWithAddForm.close();

  formNewCardValidator.disableSubmitButton();
}

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();


const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });

const popupWithEditForm = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
popupWithEditForm.setEventListeners();

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupWithEditForm.close();
}

profileEditButtonElement.addEventListener('click', function() {
  const { profileName, profileAbout } = userInfo.getUserInfo();
  inputName.value = profileName;
  inputAbout.value = profileAbout;
  popupWithEditForm.open();

  formEditValidator.resetValidation();
});

const popupWithAddForm = new PopupWithForm('.popup_type_new-card', handleCardFormSubmit);
popupWithAddForm.setEventListeners();

profileAddButtonElement.addEventListener('click', function() {
  popupWithAddForm.open();
  formNewCardValidator.resetValidation();
});


const formEditValidator = new FormValidator(selectors, popupFormEditElement);
formEditValidator.enableValidation();

const formNewCardValidator = new FormValidator(selectors, popupFormNewCardElement);
formNewCardValidator.enableValidation();