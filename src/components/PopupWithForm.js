import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = Array.from(this._form.querySelector('.popup__field'));

        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", evt => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
          });
    }

    close() {
        super.close();
        this._form.reset();
    }
}