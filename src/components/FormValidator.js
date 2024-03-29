export default class FormValidator {

  constructor(selectors, form) {
    this.selectors = selectors;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this.selectors.inputSelector));
    this._buttonElement = this._form.querySelector(this.selectors.submitButtonSelector);
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement) {
    this._formSection = inputElement.closest(this.selectors.formSection);
    inputElement.classList.add(this.selectors.inputInvalidClass);
    this._inputError = this._formSection.querySelector(this.selectors.inputErrorClass);
    this._inputError.classList.add(this.selectors.errorClass);
    this._inputError.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement) {
    this._formSection = inputElement.closest(this.selectors.formSection);
    inputElement.classList.remove(this.selectors.inputInvalidClass);
    this._inputError = this._formSection.querySelector(this.selectors.inputErrorClass);
    this._inputError.classList.remove(this.selectors.errorClass);
    this._inputError.textContent = '';
  };

  _setEventListenersOnForm () {
    this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
     });
   });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  disableSubmitButton() { 
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this.selectors.inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this.selectors.inactiveButtonClass);
    } 
  }

  enableValidation() {
    this._setEventListenersOnForm();
  }
}
