const showInputError = (inputElement, errorMessage) => {
  const formSection = inputElement.closest(selectors.formSection);
  const formError = formSection.querySelector(selectors.inputErrorClass);
  
  inputElement.classList.add(selectors.inputInvalidClass);
  formError.textContent = errorMessage;
  formError.classList.add(selectors.errorClass);
};

const hideInputError = (inputElement) => {
  const formSection = inputElement.closest(selectors.formSection);
  const formError = formSection.querySelector(selectors.inputErrorClass);

  inputElement.classList.remove(selectors.inputInvalidClass);
  formError.classList.remove(selectors.errorClass);
  formError.textContent = '';
};

const setEventListenersOnForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const checkInputValidity = (inputElement) => {
  
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector)); 

  formList.forEach((formElement) => {
    setEventListenersOnForm(formElement);
  }); 
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add('popup__submit-button_disabled');
  } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove('popup__submit-button_disabled');
  } 
}

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