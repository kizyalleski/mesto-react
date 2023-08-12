import React from "react";
import Card from "./Card";
import { api } from "../utils/Api";

export default function Main(props) {
  // состояния данных пользователя
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  // состояние карточек
  const [cards, setCards] = React.useState([]);

  // получение и подстановка начальных данных пользователя и карточек
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user-content">
          <button className="profile__avatar" onClick={props.onEditAvatar}>
            <img
              src={userAvatar}
              alt="Аватар пользователя"
              className="profile__avatar-image"
            />
          </button>
          <div className="profile__info">
            <h1 id="profileUserName" className="profile__user-name">
              {userName}
            </h1>
            <p id="profileUserOccupation" className="profile__user-occupation">
              {userDescription}
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
      <section id="elements" className="elements">
        {cards.map((card) => (
          <Card key={card._id} onCardClick={props.onCardClick} {...card} />
        ))}
      </section>
    </main>
  );
}
