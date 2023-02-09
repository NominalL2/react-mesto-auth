import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { CurrentCardsContext } from '../context/CurrentCardsContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';


function Mesto() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);

    const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) };
    const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) };
    const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) };
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsCardOpen(true);
    }

    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsCardOpen(false);
        setSelectedCard({});
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCurrentCards((state) => state.filter(c => c._id !== card._id))
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleUpdateUser({ name, about }) {
        api.sendProfileInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                closeAllPopups();
            })
    }

    function handleUpdateAvatar({ avatar }) {
        api.changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                closeAllPopups();
            })
    }

    function handleAddCard({ name, link }) {
        api.sendCard(name, link)
            .then((res) => {
                setCurrentCards([res, ...currentCards]);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                closeAllPopups();
            })
    }

    useEffect(() => {
        api.setProfileInfo()
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err)
            })

        api.initialCards()
            .then((res) => {
                setCurrentCards(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>

                <CurrentCardsContext.Provider value={currentCards}>

                    <div className="page">
                        <Header />
                        <Main onCardDel={handleCardDelete} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onOpenCard={handleCardClick} />
                        <Footer />
                        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                        <AddPlacePopup onAddCard={handleAddCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
                        <PopupWithForm name="del" title="Вы уверены?" buttonName="Да">
                        </PopupWithForm>
                        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                        <ImagePopup card={selectedCard} isOpen={isCardOpen} onClose={closeAllPopups} />
                    </div>

                </CurrentCardsContext.Provider>

            </CurrentUserContext.Provider>
        </>
    );
}

export default Mesto;