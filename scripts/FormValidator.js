export class FormValidator {

  constructor(selectors, form) {
    this.selectors = selectors;
    this._form = form;
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
    const inputList = Array.from(this._form.querySelectorAll(this.selectors.inputSelector));
    this._buttonElement = this._form.querySelector(this.selectors.submitButtonSelector);
    this._toggleButtonState(inputList, this._buttonElement);
      inputList.forEach((inputElement) => {
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
    const inputList = Array.from(this._form.querySelectorAll(this.selectors.inputSelector));
    return inputList.some((inputElement) => {
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
      this._buttonElement.classList.remove('popup__submit-button_disabled');
    } 
  }

  enableValidation() {
    this._setEventListenersOnForm(this._form, this.selectors);
  }
}
