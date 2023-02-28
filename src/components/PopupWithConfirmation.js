import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form_type_confirm');
    }

    changeFormSubmitHandler(newFormSubmitHandler) {
        this._handleFormSubmit = newFormSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }

}