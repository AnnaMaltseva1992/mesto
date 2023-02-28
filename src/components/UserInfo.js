export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo = (data) => {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data._id;
  }

  getUserId() {
    return this._userId;
  }
}
