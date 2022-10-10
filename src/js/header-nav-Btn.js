// import debounce from 'lodash.debounce';
const debounce = require('lodash.debounce');
const refsFavorite = {
  favoriteMenu: document.querySelector('.header__favorite-box'),
  favoriteBtn: document.querySelector('.header__nav-text--btn'),
};

refsFavorite.favoriteBtn.addEventListener('mouseover', onFavoriteBtnClick);
refsFavorite.favoriteMenu.addEventListener('mouseout', onFavoriteBtnClick);

function onFavoriteBtnClick() {
  refsFavorite.favoriteMenu.classList.toggle('header__favorite-box--is-hidden');
}
