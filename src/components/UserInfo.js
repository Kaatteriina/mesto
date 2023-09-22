export default class UserInfo {
  
  constructor({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileAbout = document.querySelector(profileAboutSelector)
    this._profileAvatar = document.querySelector(profileAvatarSelector)
  }


  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }


  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name
    this._profileAbout.textContent = about
    this._profileAvatar.src = avatar
  }
}