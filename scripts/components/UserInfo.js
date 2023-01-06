export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        this._data = {
            profileName: this._name.textContent,
            profileAbout: this._about.textContent
        }
        return this._data;
    }


    setUserInfo(inputName, inputAbout) {
        this._name.textContent = inputName.value;
        this._about.textContent = inputAbout.value;
    }
}