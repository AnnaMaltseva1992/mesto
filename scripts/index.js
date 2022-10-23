const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let popupFormElement = document.querySelector('.popup__form');
let inputName = popupFormElement.querySelector('.popup__field_input_name');
let inputAbout = popupFormElement.querySelector('.popup__field_input_about');
let popupSubmitButtonElement = document.querySelector('.popup__submit-button');

const openPopup = function() {
  popupElement.classList.add('popup__is-opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup__is-opened');
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
}

profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

let addProfileInfo = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

popupFormElement.addEventListener('submit', addProfileInfo);