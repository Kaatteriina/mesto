export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl
    this.headers = headers
  }
  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/users/me', {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);

    }).catch(err => {
      console.log(err)
    })
  }
  getAllCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards', {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);

    }).catch(err => {
      console.log(err)
    })
  }
  editUserInfo(body) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
          return res.json();
        }

      return Promise.reject(`Ошибка: ${res.status}`);

    }).catch(err => {
      console.log(err)
    }); 
  }
  createCard(body) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
   }).then(res => {
    if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);


   }).catch(err => {
    console.log(err)
  })
  }
  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-75/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
   }).then(res => {
    if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);


   }).catch(err => {
    console.log(err)
  })
  }

  likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-75/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
   }).then(res => {
    if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);


   }).catch(err => {
    console.log(err)
  })
  }
  unlikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-75/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
   }).then(res => {
    if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);


   }).catch(err => {
    console.log(err)
  })  
  }

  updateAvatar(body) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
          return res.json();
        }

      return Promise.reject(`Ошибка: ${res.status}`);

    }).catch(err => {
      console.log(err)
    }); 
  }
}