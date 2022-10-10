import cocktailCard from '../template/cocktail-card.hbs';
import noFindAnyCoctail from '../template/not-found-cocktails.hbs';
import modalCoctails from '../template/modal-cocktails.hbs';
import modalIngredients from '../template/modal-ingred.hbs';
import { getApiData } from './rendering-catalogue';
import { checkingScreenWidth } from './cheking-screen-width';

const refsGallery = {
  formHeader: document.querySelector('.header__search-form'),
  catalogueTitle: document.querySelector('.catalogue__title'),
  catalogueList: document.querySelector('.catalogue__list'),
};

const getClassApiData = new getApiData();

const cocktailIngredientList = {};

refsGallery.formHeader.addEventListener('submit', getSearchCocktailByName);

function getSearchCocktailByName(e) {
  e.preventDefault();
  getClassApiData.value = e.currentTarget.elements.headerInput.value.trim();
  refsGallery.formHeader.reset();
  if (getClassApiData.value) {
    getClassApiData.key = 's';
    getClassApiData.param = 'search';
    getRenderingCocktailByName();
    refsGallery.catalogueList.innerHTML = '';
  }
}

async function getRenderingCocktailByName() {
  const r = await getClassApiData.getParsedApiData();

  ifNoFindAnyCocktail(r);
}

async function getRenderingRandomCoctail() {
  refsGallery.catalogueTitle.textContent = 'Cocktails';
  for (let i = 0; i < checkingScreenWidth; i += 1) {
    const r = await getClassApiData.getParsedApiDataRandom();
    getRenderingApi(r);
  }
}

getRenderingRandomCoctail();

function getRenderingApi(r) {
  const data = r
    .map(result => {
      return cocktailCard(result);
    })
    .join('');

  refsGallery.catalogueList.insertAdjacentHTML('beforeend', data);

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Sergey↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const openModalBtn = document.querySelector('[data-modal-open]');
  openModalBtn.addEventListener('click', toggleModals);
  openModalBtn.addEventListener('click', modalCocktails);
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑Sergey↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
}

function ifNoFindAnyCocktail(r) {
  if (r !== null) {
    let arr = [];
    for (let i = 0; i < checkingScreenWidth; i += 1) {
      if (r[i]) {
        arr.push(r[i]);
      }
    }
    refsGallery.catalogueTitle.textContent = 'Cocktails';
    getRenderingApi(arr);
  } else {
    resetContent();
    refsGallery.catalogueList.insertAdjacentHTML(
      'beforeend',
      noFindAnyCoctail()
    );
  }
}

function refactoringCocktailsArray(elements) {
  return elements.map(el => {
    let ing = [];
    let dose = [];
    let doseInt = [];

    for (let key of Object.keys(el)) {
      for (let i = 1; i < 15; i += 1) {
        if (key === `strIngredient${i}` && el[key] !== null) {
          ing.push(el[key]);
          el.strIngredient = ing;
        }
      }
    }
    for (let key of Object.keys(el)) {
      for (let i = 1; i < 15; i += 1) {
        if (key === `strMeasure${i}` && el[key] !== null) {
          dose.push(el[key]);
          el.strMeasure = dose;
        }
      }
    }
    for (let i = 0; i < ing.length; i += 1) {
      if (dose[i] !== undefined) {
        let combi = `${dose[i]} ${ing[i]}`;
        doseInt.push(combi);
        el.strDoseIng = doseInt;
      } else {
        let combi = `${ing[i]}`;
        doseInt.push(combi);
        el.strDoseIng = doseInt;
      }
    }
  });
}

function resetContent() {
  refsGallery.catalogueList.innerHTML = '';
  refsGallery.catalogueTitle.textContent = '';
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Sergey↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const refsModal = {
  modal: document.querySelector('[data-modal]'),
  modalPatt: document.querySelector('.modal-first'),
  modalModalIngredientInfo: document.querySelector('.modal-campari'),
};

async function getSearchCocktailById(id) {
  getClassApiData.key = 'i';
  getClassApiData.value = id;
  getClassApiData.param = 'lookup';
  const r = await getClassApiData.getParsedApiData();
  refactoringCocktailsArray(r);

  const [resp] = r;
  refsModal.modalPatt.insertAdjacentHTML('beforeend', modalCoctails(resp));

  modalClose();

  searchIngredientInModal();

  const nameIngredient = document.querySelector('.modal-first__list');
  nameIngredient.addEventListener('click', openModalIng);
}

function searchIngredientInModal() {
  const modalListItems = document.querySelector('.modal-first__list');
  modalListItems.addEventListener('click', onClickModalListItems);

  function onClickModalListItems(e) {
    cocktailIngredientList.ingredient = startsWithCapital(e.target.textContent);
  }
}

function startsWithCapital(string) {
  for (let i = 0; i < string.length; i += 1) {
    let upperLetter = /[A-Z]/.test(string.charAt(i));
    if (upperLetter) {
      return string.slice(i, string.length);
    }
  }
}

function modalCocktails(e) {
  const getId = e.target.offsetParent.attributes[0].value;

  getSearchCocktailById(getId);
  refsModal.modalPatt.innerHTML = '';
}

function modalClose() {
  const closeModalCoctail = document.querySelector('.modal-first__icon-close');
  const modalCoctail = document.querySelector('.backdrop');
  closeModalCoctail.addEventListener('click', closeModalCoctailOnClick);
  modalCoctail.addEventListener('click', closeModalCoctailOnClick);
}

function closeModalCoctailOnClick(e) {
  if (e.target.classList.contains('exp')) {
    document.querySelector('.backdrop').classList.add('is-hidden');
    document.body.classList.remove('overflow');
  } else {
    return;
  }
}

function toggleModals(e) {
  if (
    e.target.classList.contains('open-modal-button') ||
    e.target.classList.contains('backdrop') ||
    e.target.classList.contains('modal-first__icon-close')
  ) {
    document.body.classList.toggle('overflow');
    refsModal.modal.classList.toggle('is-hidden');
  }
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑Sergey↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//  ----------Іванка---------------
function openModalIng(event) {
  if (event.target.classList.contains('modal-first__item')) {
    document.body.classList.add('overflow-campari');
    const modalIngred = document.querySelector('.backdrop-campari');

    getSearchIngredientByName(cocktailIngredientList.ingredient);

    modalIngred.classList.remove('is-hidden-campari');
  }
}

async function getSearchIngredientByName(name) {
  getClassApiData.key = 'i';
  getClassApiData.value = name;
  getClassApiData.param = 'search';
  const r = await getClassApiData.getParsedApiDataIngredient();
  refsModal.modalModalIngredientInfo.insertAdjacentHTML(
    'beforeend',
    modalIngredients(r)
  );
  closeIngredient();
}

function closeIngredient() {
  const closeModalIngred = document.querySelector('.campari-btn__close');
  const modalIngred = document.querySelector('.backdrop-campari');
  closeModalIngred.addEventListener('click', closeOnClick);
  modalIngred.addEventListener('click', closeOnClick);
}

function closeOnClick(event) {
  if (event.target.classList.contains('red')) {
    document
      .querySelector('.backdrop-campari')
      .classList.add('is-hidden-campari');
    document.body.classList.remove('overflow-campari');
  } else {
    return;
  }
  reserIngredientsMarkup();
}

function reserIngredientsMarkup() {
  setTimeout(() => {
    refsModal.modalModalIngredientInfo.innerHTML = '';
  }, 1001);
}
// -----Іванка----
