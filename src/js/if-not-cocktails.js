import noFindFavoriteCoctail from '../template/not-found-cocktails-copy.hbs';

const ifNotCocktails = document.querySelector(
  'body > main > div.favorite-cocktails-page > section > div > ul'
);
const ifNotCocktailsText = document.querySelector(
  'body > main > div.favorite-cocktails-page > section > div > h2'
);
const onClickFavoriteBtnNav = document.querySelector(
  '#header > div > div.header__favorite-box > ul > li:nth-child(1)'
);

// console.log(ifNotCocktails.children.length);

onClickFavoriteBtnNav.addEventListener(
  'click',
  onClickEmptyListOnFavoriteCocktails
);

function onClickEmptyListOnFavoriteCocktails() {
  if (ifNotCocktails.children.length === 0) {
    ifNotCocktailsText.style.display = 'none';
    ifNotCocktails.insertAdjacentHTML('beforeend', noFindFavoriteCoctail());
    // console.log('it is true');
  }
}
