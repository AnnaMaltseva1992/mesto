import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
        this._submitButton = this._form.querySelector('.popup__submit-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setInputValues(data){
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          });
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = 'Cохранение...';
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}