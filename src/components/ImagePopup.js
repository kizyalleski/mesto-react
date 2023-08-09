import React from "react";

export default function ImagePopup() {
  return (
    <div id="imagePopup" className="popup popup_image">
      <div className="popup__container popup__container_image">
        <button
          type="button"
          id="closeImagePopupButton"
          className="popup__close-button"
          aria-label="Закрыть"
        ></button>
        <img src="#" alt="" className="popup__image" />
        <p className="popup__caption"></p>
      </div>
    </div>
  );
}
