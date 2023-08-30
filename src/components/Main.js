import React from "react";
import Card from "./Card";
import { api } from "../utils/Api";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main(props) {
  // состояние карточек
  const [cards, setCards] = React.useState([]);
  // контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // получение и подстановка начальных карточек
  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
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
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__avatar-image"
            />
          </button>
          <div className="profile__info">
            <h1 id="profileUserName" className="profile__user-name">
              {currentUser.name}
            </h1>
            <p id="profileUserOccupation" className="profile__user-occupation">
              {currentUser.about}
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
