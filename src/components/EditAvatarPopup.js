import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  // реф инпута
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }
  
  // очищение поля ввода при закрытии попапа
  React.useEffect(() => {
    if (!isOpened) {
      inputRef.current.value = '';
    }
  }, [isOpened]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="url"
        id="formAvatarLink"
        name="avatar-link-input"
        className="form__input"
        placeholder="Ссылка"
        required
        ref={inputRef}
      />
      <span className="formAvatarLink-error form__error form__error_single">
        &nbsp;
      </span>
    </PopupWithForm>
  );
}
