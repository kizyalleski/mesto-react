import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpened, onClose, onUpdateUser, buttonText }) {
  // контекст данных текущего пользователя для значений по умолчанию
  const currentUser = React.useContext(CurrentUserContext);
  // стейт переменные для управляемого компонента формы
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // функции обработчиков формы; изменения стейта
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // подстановка в поля формы значения по умолчанию (из контекста)
  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpened]);

  // обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="text"
        id="formUserName"
        name="userNameInput"
        className="form__input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="formUserName-error form__error">&nbsp;</span>
      <input
        type="text"
        id="formUserOccupation"
        name="userOccupationInput"
        className="form__input"
        placeholder="Род деятельности"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="formUserOccupation-error form__error">&nbsp;</span>
    </PopupWithForm>
  );
}
