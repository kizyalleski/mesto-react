import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ name, link, likes, owner, onCardClick }) {
  function handleClick() {
    onCardClick(link, name); // (объявлена в Api и передана в Main и далее в Card через пропс)
  }
  // контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);
  // определяем являемся ли пользователь владельцем карточки
  const isOwner = owner._id === currentUser.id;
  // определяем лайкнул ли пользователь карточку
  const isLiked = likes.some(i => i._id === currentUser.id);

  return (
    <article className="element">
      <button
        className="element__fullscreen"
        aria-label="Открыть изображение"
        onClick={handleClick}
      >
        <img className="element__image" alt={name} src={link} />
      </button>
      {isOwner && (
        <button
          type="button"
          className="element__trash"
          aria-label="Удалить изображение"
        ></button>
      )}
      <div className="element__description">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={`element__like ${isLiked ? 'element__like_active' : ''}`}
            aria-label="Лайк"
          ></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}
