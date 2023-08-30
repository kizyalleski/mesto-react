import { apiData } from "./constants";

class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {

    return this._request('/users/me', {
      headers: {
        authorization: this._token,
      },
    });
  }

  getInitialCards() {
    return this._request('/cards', {
      headers: {
        authorization: this._token,
      },
    });
  }

  updateUserData({ formUserName, formUserOccupation }) {
    return this._request('/users/me', {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formUserName,
        about: formUserOccupation,
      }),
    });
  }

  addNewCard(cardName, cardLink) {
    return this._request('/cards', {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });
  }

  handleLike(imageId, isLiked) {
    const requestMethod = !isLiked ? "PUT" : "DELETE";
    return this._request(`/cards/${imageId}/likes`, {
      method: requestMethod,
      headers: {
        authorization: this._token,
      },
    });
  }

  changeAvatar(avatarUrl) {
    return this._request('/users/me/avatar', {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }
}

export const api = new Api(apiData);
