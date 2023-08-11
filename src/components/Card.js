import React from "react";

export default function Card({ name, link, likes, onCardClick }) {
  function handleClick() {
    onCardClick(link, name);
  }

  return (
    <article className="element">
      <button
        className="element__fullscreen"
        aria-label="Открыть изображение"
        onClick={handleClick}
      >
        <img className="element__image" alt={name} src={link} />
      </button>
      <button
        type="button"
        className="element__trash"
        aria-label="Удалить изображение"
      ></button>
      <div className="element__description">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className="element__like"
            aria-label="Лайк"
          ></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}
