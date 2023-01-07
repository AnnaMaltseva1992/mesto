import '../utils/index.css';

import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { 
  profileEditButtonElement,
  profileAddButtonElement, 
  popupFormEditElement, 
  inputName,
  inputAbout, 
  popupFormNewCardElement, 
  inputPlace,
  inputLink,
  selectors
} from '../utils/constants.js';

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

function handleProfileFormSubmit() {
  userInfo.setUserInfo(inputName, inputAbout);
  popupWithEditForm.close();
}

profileEditButtonElement.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.profileName;
  inputAbout.value = userData.profileAbout;
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