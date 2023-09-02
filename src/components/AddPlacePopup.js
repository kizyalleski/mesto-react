import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpened, onClose, onUpdateCards }) {
  // стейт переменные для управляемого компонента формы
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  // функция обработчик формы; изменения стейта
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  // обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards(name, link);
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name="card-adding"
      title="Новое место"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="formCardName"
        name="card-name-input"
        className="form__input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="formCardName-error form__error">&nbsp;</span>
      <input
        type="url"
        id="formCardUrl"
        name="card-url-input"
        className="form__input"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="formCardUrl-error form__error">&nbsp;</span>
    </PopupWithForm>
  );
}
