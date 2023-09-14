export default class UserInfo {
  
  constructor({profileNameSelector, profileAboutSelector}) {
    this.$profileName = document.querySelector(profileNameSelector)
    this.$profileAbout = document.querySelector(profileAboutSelector)
  }


  getUserInfo() {
    return {
      name: this.$profileName.textContent,
      about: this.$profileAbout.textContent
    }
  }


  setUserInfo({name, about}) {
    this.$profileName.textContent = name
    this.$profileAbout.textContent = about
  }
}