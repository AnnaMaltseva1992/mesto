export const profileEditButtonElement = document.querySelector('.profile__edit-button');
export const profileAddButtonElement = document.querySelector('.profile__add-button');
export const avatarEditButtonElement = document.querySelector('.profile__avatar-button');

export const popupFormEditElement = document.querySelector('.popup__form_type_edit');
export const inputName = popupFormEditElement.querySelector('.popup__field_input_name');
export const inputAbout = popupFormEditElement.querySelector('.popup__field_input_about');
export const popupFormNewCardElement = document.querySelector('.popup__form_type_new-card');
export const popupFormNewAvatarElement = document.querySelector('.popup_type_new-avatar');

export const inputPlace = popupFormNewCardElement.querySelector('.popup__field_input_place');
export const inputLink = popupFormNewCardElement.querySelector('.popup__field_input_link');

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
  formSection: '.popup__form-section',
  inputInvalidClass: 'popup__field_invalid'
}