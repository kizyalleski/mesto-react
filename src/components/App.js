import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";

function App() {
  // функции открытия и закрытия попапов
  function handleEditAvatarClick() {
    changeIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    changeIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    changeIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    changeIsEditAvatarPopupOpen(false);
    changeIsEditProfilePopupOpen(false);
    changeIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  // коллбэк для обработчика клика по изображению (App -> Main -> Card)
  function handleCardClick(cardLink, cardName) {
    setSelectedCard({ link: cardLink, name: cardName });
  }

  // состояния попапов
  const [isEditAvatarPopupOpen, changeIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, changeIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, changeIsAddPlacePopupOpen] =
    React.useState(false);

  // состояние выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState(false);

  // состояния данных пользователя
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  // состояние карточек
  const [cards, setCards] = React.useState([]);

  // получение и подстановка начальных данных пользователя и карточек
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="avatar"
        title=""
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
        <span className="formAvatarLink-error form__error form__error_single"></span>
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
      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        isOpened={false}
      ></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
