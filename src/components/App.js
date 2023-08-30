import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // функции открытия и закрытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ link: "", name: "" });
  }

  // коллбэк для обработчика клика по изображению (App -> Main -> Card)
  function handleCardClick(cardLink, cardName) {
    setSelectedCard({ link: cardLink, name: cardName });
  }

  // состояния попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  // состояние выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
  });

  // состояние текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // эффект получения начальных данных пользователя
  React.useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            id="formAvatarLink"
            name="avatar-link-input"
            className="form__input"
            placeholder="Ссылка"
            required
          />
          <span className="formAvatarLink-error form__error form__error_single">
            &nbsp;
          </span>
        </PopupWithForm>
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
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
          />
          <span className="formUserOccupation-error form__error">&nbsp;</span>
        </PopupWithForm>
        <PopupWithForm
          name="card-adding"
          title="Новое место"
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          />
          <span className="formCardName-error form__error">&nbsp;</span>
          <input
            type="url"
            id="formCardUrl"
            name="card-url-input"
            className="form__input"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="formCardUrl-error form__error">&nbsp;</span>
        </PopupWithForm>
        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          isOpened={false}
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
