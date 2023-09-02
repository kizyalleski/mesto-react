import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { api } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/Cards";

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
  // состояние карточек
  const [cards, setCards] = React.useState([]);

  // эффект получения начальных данных пользователя и карточек
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // функция лайка
  function handleCardLike(likes, cardId) {
    const isLiked = likes.some((i) => i._id === currentUser.id);
    api
      .handleLike(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => {
          // если id карточки совпадает с текущей, то возвращаем ее обновленную версию
          return state.map((c) => (c._id === cardId ? newCard : c));
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // функция удаления лайка
  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => {
          return state.filter((card) => card._id !== cardId);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // функция сабмита формы обновления данных пользователя
  function handleUpdateUser(userData) {
    api
      .updateUserData(userData)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          about: data.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция сабмита формы обновления аватара
  function handleUpdateAvatar(avatarLink) {
    api.changeAvatar(avatarLink)
      .then(data => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar
        });
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <CardsContext.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </CardsContext.Provider>
        <Footer />
        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
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
