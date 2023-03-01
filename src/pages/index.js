import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

import { 
  profileEditButtonElement,
  profileAddButtonElement, 
  avatarEditButtonElement,
  popupFormEditElement, 
  popupFormNewCardElement, 
  popupFormNewAvatarElement,
  selectors
} from '../utils/constants.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '25c2d675-17da-4af0-aa90-e4053257d999',
    "Content-Type": 'application/json'
  }
}); 

Promise.all([api.getUserInformation() , api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err} при загрузке данных с сервера`);
  });

  

    //начальные карточки

    const section = new Section({ 
      renderer: 
      
      (data) => {
        renderCard(data);
      }
    }, 
      '.cards__list');

    function createCard(item) {
      const card = new Card(
        { 
          data: item, 
          handleCardClick,
          handleLikeClick,
          handleDeleteButtonClick: () => {
            popupWithConfirmation.open();
            popupWithConfirmation.changeFormSubmitHandler(() => {
              api
                .deleteCard(item._id)
                .then(() => {
                  card.handleCardDelete(card)
                  popupWithConfirmation.close();
                })
                .catch((err) => console.log(`Ошибка удаления ${err}`))
            })
          }
        },
        '.card-template', 
        userInfo.getUserId(),
      );
      return card.createCard();
    }

    function renderCard(cardData) {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    }

    
//лайки
function handleLikeClick(card) {
  if(card.isLiked()) {
    api
    .deleteLike(card._id)
    .then((res) => {
      card.setMyLike(res.likes);
    })
  } else {
    api
    .addLike(card._id)
    .then((res) => {
      card.setMyLike(res.likes);
    })
    .catch((err) => {
      console.log(`Ошибка постановки лайка ${err}`)
    })
  }
}


//попап с картинкой
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}


//редактирование профиля
const userInfo = new UserInfo({ 
  nameSelector: '.profile__title', 
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

const popupWithEditForm = new PopupWithForm('.popup_type_edit', (items) => {
  popupWithEditForm.renderLoading(true);
  api
    .editProfile(items)
    .then((item) => {
      userInfo.setUserInfo(item);
      popupWithEditForm.close();

    })
    .catch((err) => console.log(`Ошибка редактирования профиля: ${err}`))
    .finally(() => popupWithEditForm.renderLoading(false))
});
popupWithEditForm.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
  popupWithEditForm.open();
  const userData = userInfo.getUserInfo();
  popupWithEditForm.setInputValues(userData);
  
  formEditValidator.resetValidation();
});

//добавление карточек

const popupWithAddForm = new PopupWithForm('.popup_type_new-card', handleAddFormSubmit);

function handleAddFormSubmit(items) {
  popupWithAddForm.renderLoading(true);
  api
    .addNewCard(items)
    .then((res) => {
      renderCard(res);
      popupWithAddForm.close();
    })
    
    .catch((err) => console.log(`Произошла ошибка ${err}`))
    
    .finally(() => popupWithAddForm.renderLoading(false))
    }
  
popupWithAddForm.setEventListeners();

profileAddButtonElement.addEventListener('click', () => {
  popupWithAddForm.open();
  formNewCardValidator.resetValidation();
});

//редактирование аватара

const popupWithAvatarForm = new PopupWithForm('.popup_type_new-avatar', handleAvatarFormSubmit);

function handleAvatarFormSubmit(data) {
  popupWithAvatarForm.renderLoading(true);
  api.editAvatar(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupWithAvatarForm.close();
  })
  .catch((err) => console.log(`Произошла ошибка ${err}`))
  .finally(() => {
    popupWithAvatarForm.renderLoading(false);
  });
}

popupWithAvatarForm.setEventListeners();

avatarEditButtonElement.addEventListener('click', () => {
  popupWithAvatarForm.open();
  formNewAvatarValidator.resetValidation()
  }
)

//попап удаления карточки

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirm');


popupWithConfirmation.setEventListeners();
//валидаторы

const formEditValidator = new FormValidator(selectors, popupFormEditElement);
formEditValidator.enableValidation();

const formNewCardValidator = new FormValidator(selectors, popupFormNewCardElement);
formNewCardValidator.enableValidation();

const formNewAvatarValidator = new FormValidator(selectors, popupFormNewAvatarElement);
formNewAvatarValidator.enableValidation();
