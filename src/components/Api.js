export default class Api {
    constructor(config) {
      this._baseUrl = config.baseUrl;
      this._headers = config.headers;
    }

    _prepareResponse(res) {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    }
  
    getUserInformation() {
      return fetch (`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      }) 
      .then(this._prepareResponse)
    }
  

    getInitialCards() {
      return fetch (`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      }) 
      .then(this._prepareResponse)
    }
    
 
    editProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name: data.name, about: data.about })
      })
      .then(this._prepareResponse)
    }

    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name: data.place, link: data.link })
      })
      .then(this._prepareResponse)
    }

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._prepareResponse)
    }
  
    addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._prepareResponse)
    }
  
  
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._prepareResponse) 
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link
        })
      })
        .then(this._prepareResponse) 
    }
  }


