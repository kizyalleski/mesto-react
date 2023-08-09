import React from "react";

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_form">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__heading">{props.title}</h3>
        <form className="form" name={props.name}>
          {props.children}
          <button type="submit" className="form__submit">
            {props.name === 'card-adding' ? 'Создать' : props.name === 'confirmation' ? 'Да' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}
