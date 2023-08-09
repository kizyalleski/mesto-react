import React from "react";

export default function Main() {
  function handleEditAvatarClick() {
    const avatarPopup = document.querySelector("#updateAvatarPopup");
    avatarPopup.classList.add("popup_opened");
  }

  function handleEditProfileClick() {
    const profilePopup = document.querySelector("#editProfilePopup");
    profilePopup.classList.add("popup_opened");
  }

  function handleAddPlaceClick() {
    const cardEditinPopup = document.querySelector("#addCardPopup");
    cardEditinPopup.classList.add("popup_opened");
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user-content">
          <button className="profile__avatar" onClick={handleEditAvatarClick}>
            <img
              src="#"
              alt="Аватар пользователя"
              className="profile__avatar-image"
            />
          </button>
          <div className="profile__info">
            <h1 id="profileUserName" className="profile__user-name">
              Жак
            </h1>
            <p id="profileUserOccupation" className="profile__user-occupation">
              Исследователь
            </p>
            <button
              id="editProfileButton"
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={handleEditProfileClick}
            ></button>
          </div>
        </div>
        <button
          id="addCardFormButton"
          type="button"
          className="profile__add-button"
          aria-label="Добавить изображение"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section id="elements" className="elements"></section>
    </main>
  );
}