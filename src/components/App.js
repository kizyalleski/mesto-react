import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  function handleEditAvatarClick() {
    changeIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    changeIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    changeIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, changeIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, changeIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, changeIsAddPlacePopupOpen] = React.useState(false);

  return (
    <div className="App">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />
      <PopupWithForm name="avatar" title="" isOpened={isEditAvatarPopupOpen}>
        <input
          type="url"
          id="formAvatarLink"
          name="avatar-link-input"
          className="form__input"
          placeholder="Ссылка"
          required
        />
        <span className="formAvatarLink-error form__error form__error_single"></span>
      </PopupWithForm>
      <PopupWithForm name="profile" title="Редактировать профиль" isOpened={isEditProfilePopupOpen}>
        <input
          type="text"
          id="formUserName"
          name="userNameInput"
          className="form__input"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="formUserName-error form__error"></span>
        <input
          type="text"
          id="formUserOccupation"
          name="userOccupationInput"
          className="form__input"
          placeholder="Род деятельности"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="formUserOccupation-error form__error"></span>
      </PopupWithForm>
      <PopupWithForm name="card-adding" title="Новое место" isOpened={isAddPlacePopupOpen}>
        <input
          type="text"
          id="formCardName"
          name="card-name-input"
          className="form__input"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="formCardName-error form__error"></span>
        <input
          type="url"
          id="formCardUrl"
          name="card-url-input"
          className="form__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="formCardUrl-error form__error"></span>
      </PopupWithForm>
      <PopupWithForm name="confirmation" title="Вы уверены?" isOpened={false}>
      </PopupWithForm>
      <ImagePopup />
      {/* <template id="elementTemplate">
        <article className="element">
          <button className="element__fullscreen">
            <img className="element__image" aria-label="Открыть изображение" />
          </button>
          <button
            type="button"
            className="element__trash"
            aria-label="Удалить изображение"
          ></button>
          <div className="element__description">
            <h2 className="element__name"></h2>
            <div className="element__like-container">
              <button
                type="button"
                className="element__like"
                aria-label="Лайк"
              ></button>
              <p className="element__like-counter"></p>
            </div>
          </div>
        </article>
      </template> */}
      {/* <div id="editProfilePopup" className="popup">
        <div className="popup__container popup__container_form">
          <button
            id="closeEditProfilePopupButton"
            type="button"
            className="popup__close-button"
            aria-label="Закрыть"
          ></button>
          <h3 className="popup__heading">Редактировать профиль</h3>
          <form name="userInfoForm" id="editingProfileForm" className="form">
            <input
              type="text"
              id="formUserName"
              name="userNameInput"
              className="form__input"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="formUserName-error form__error"></span>
            <input
              type="text"
              id="formUserOccupation"
              name="userOccupationInput"
              className="form__input"
              placeholder="Род деятельности"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="formUserOccupation-error form__error"></span>
            <button type="submit" className="form__submit">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
      {/* <div id="addCardPopup" className="popup">
        <div className="popup__container popup__container_form">
          <button
            id="closeAddCardPopupButton"
            type="button"
            className="popup__close-button"
            aria-label="Закрыть"
          ></button>
          <h3 className="popup__heading">Новое место</h3>
          <form name="addCardForm" id="addCardForm" className="form">
            <input
              type="text"
              id="formCardName"
              name="card-name-input"
              className="form__input"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="formCardName-error form__error"></span>
            <input
              type="url"
              id="formCardUrl"
              name="card-url-input"
              className="form__input"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="formCardUrl-error form__error"></span>
            <button name="addCardButton" type="submit" className="form__submit">
              Создать
            </button>
          </form>
        </div>
      </div> */}
      {/* <div id="imagePopup" className="popup popup_image">
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
      </div> */}
      {/* <div id="confirmPopup" className="popup">
        <div className="popup__container popup__container_confirm">
          <button
            id="closeConfirmPopupButton"
            type="button"
            className="popup__close-button"
            aria-label="Закрыть"
          ></button>
          <h3 className="popup__heading popup__heading_confirm">Вы уверены?</h3>
          <form className="form">
            <button type="submit" className="form__submit">
              Да
            </button>
          </form>
        </div>
      </div> */}
      {/* <div id="updateAvatarPopup" className="popup">
        <div className="popup__container popup__container_form">
          <button
            id="closeUpdateAvatarPopupButton"
            type="button"
            className="popup__close-button"
            aria-label="Закрыть"
          ></button>
          <h3 className="popup__heading">Обновить аватар</h3>
          <form name="updateAvatarForm" id="updateAvatarForm" className="form">
            <input
              type="url"
              id="formAvatarLink"
              name="avatar-link-input"
              className="form__input"
              placeholder="Ссылка"
              required
            />
            <span className="formAvatarLink-error form__error form__error_single"></span>
            <button
              name="updateAvatarButton"
              type="submit"
              className="form__submit"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default App;
