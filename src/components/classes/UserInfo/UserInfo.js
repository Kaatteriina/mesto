export default class UserInfo {
  
  constructor({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
    this.$profileName = document.querySelector(profileNameSelector)
    this.$profileAbout = document.querySelector(profileAboutSelector)
    this.$profileAvatar = document.querySelector(profileAvatarSelector)
  }


  getUserInfo() {
    return {
      name: this.$profileName.textContent,
      about: this.$profileAbout.textContent,
      avatar: this.$profileAvatar.src
    }
  }


  setUserInfo({name, about, avatar}) {
    this.$profileName.textContent = name
    this.$profileAbout.textContent = about
    this.$profileAvatar.src = avatar
  }
}