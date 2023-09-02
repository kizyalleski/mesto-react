import React from "react";

export default function PopupWithForm({
  name,
  title,
  isOpened,
  onClose,
  onSubmit,
  buttonText,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpened ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_form">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h3 className="popup__heading">{title}</h3>
        <form className="form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
