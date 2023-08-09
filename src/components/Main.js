import React from "react";

export default function Main(props) {

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user-content">
          <button className="profile__avatar" onClick={props.onEditAvatar}>
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
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          id="addCardFormButton"
          type="button"
          className="profile__add-button"
          aria-label="Добавить изображение"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section id="elements" className="elements"></section>
    </main>
  );
}
