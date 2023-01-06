export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return {
            profileName: this._name.textContent,
            profileAbout: this._about.textContent
        }
    }


    setUserInfo(data) {
        this._name.textContent = data.profileName;
        this._about.textContent = data.profileAbout;
    }
}