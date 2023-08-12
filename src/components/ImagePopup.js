import React from "react";

export default function ImagePopup(props) {
  return (
    <div id="imagePopup" className={`popup popup_image ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button
          type="button"
          id="closeImagePopupButton"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
}
