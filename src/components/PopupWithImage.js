import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupselector) {
        super(popupselector);
        this._popupPhoto = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');

    }

    open(name, link) {
        this._popupPhoto.src = link;
        this._popupPhoto.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}