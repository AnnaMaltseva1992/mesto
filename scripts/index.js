// popups
const popupEditElement = document.querySelector('.popup_type_edit');
const popupNewCardElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('popup_type_image');

// popups close buttons
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__close');
const popupNewCardCloseButtonElement  = popupNewCardElement.querySelector('.popup__close');

//popups open buttons
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const cardPhotoElement = document.querySelectorAll('.card__photo');

//like button
const likeButtonElement = document.querySelectorAll('.card__like');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let popupFormElement = document.querySelector('.popup__form');
let inputName = popupFormElement.querySelector('.popup__field_input_name');
let inputAbout = popupFormElement.querySelector('.popup__field_input_about');
let popupSubmitButtonElement = document.querySelector('.popup__submit-button');
let inputPlace = popupFormElement.querySelector('.popup__field_input_place');
let inputLink = popupFormElement.querySelector('.popup__field_input_link');


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

let addProfileInfo = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}
  
let likeButtonActive = function(evt) {
  evt.target.classList.toggle('card__like_active');
}

//event listeners
profileEditButtonElement.addEventListener('click', function() {
  openPopup(popupEditElement);
});

profileAddButtonElement.addEventListener('click', function() {
  openPopup(popupNewCardElement);
});

cardPhotoElement.forEach(function(element) {
  element.addEventListener('click', function() {
    openPopup(popupImageElement);
  })
});

popupEditCloseButtonElement.addEventListener('click', function() {
  closePopup(popupEditElement);
});

popupNewCardCloseButtonElement.addEventListener('click', function() {
  closePopup(popupNewCardElement);
});

popupEditElement.addEventListener('click', closePopupEditElementByClickOnOverlay);

popupNewCardElement.addEventListener('click', closePopupNewCardElementByClickOnOverlay);

popupFormElement.addEventListener('submit', addProfileInfo);

likeButtonElement.forEach(function(element) {
  element.addEventListener('click', likeButtonActive);
});