import { getApiData } from './rendering-catalogue';
import cocktailCard from '../template/cocktail-card.hbs';
import { checkingScreenWidth } from './cheking-screen-width';
import noFindAnyCoctail from '../template/not-found-cocktails.hbs';
const refs = {
  selectBtn: document.querySelector('.select__btn'),
  selectItem: document.querySelectorAll('.select__item'),
  selectBody: document.querySelector('.select__body'),
  selectBtnText: document.querySelector('.select__current'),
  catalogueTitle: document.querySelector('.catalogue__title'),
  catalogueList: document.querySelector('.catalogue__list'),
};

refs.selectBody.addEventListener('click', onItemClick);
refs.selectBtn.addEventListener('click', () => {
  refs.selectBody.classList.toggle('is-hidden-hero');
});

function onItemClick(e) {
  // console.log(e.target.dataset.value);

  let text = e.target.dataset.value;
  refs.selectBtnText.textContent = text;
  refs.selectBody.classList.add('is-hidden-hero');
}

// const refsGallery = {
//   catalogueList: document.querySelector('.catalogue__list'),
// };

const getData = new getApiData();

refs.selectBody.addEventListener('click', getSearchCocktailFirstLetter);

async function getSearchCocktailFirstLetter(e) {
  // console.log(e.target.dataset.value);
  getData.value = e.target.dataset.value;

  if (getData.value) {
    getData.param = 'search';
    getData.key = 'f';
    getRenderingCocktailfirst();
    refs.catalogueList.innerHTML = '';
  }
}
async function getRenderingCocktailfirst() {
  const r = await getData.getParsedApiData();

  ifNoFindAnyCocktail(r);
}
function getRenderingApi(r) {
  const data = r
    .map(result => {
      return cocktailCard(result);
    })
    .join('');
  refs.catalogueList.insertAdjacentHTML('beforeend', data);
}

function ifNoFindAnyCocktail(r) {
  if (r !== null) {
    let arr = [];
    for (let i = 0; i < checkingScreenWidth; i += 1) {
      if (r[i]) {
        arr.push(r[i]);
      }
    }
    refs.catalogueTitle.textContent = 'Cocktails';
    getRenderingApi(arr);
  } else {
    resetContent();
    refs.catalogueList.insertAdjacentHTML('beforeend', noFindAnyCoctail());
  }
}
function resetContent() {
  refs.catalogueList.innerHTML = '';
  refs.catalogueTitle.textContent = '';
}
