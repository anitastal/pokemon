// const { data } = require('infinite-scroll');

const testToHome = document.querySelector(
  '#header > div > div.header__menu.header__menu--is-hidden > nav > ul > li.header__nav-item.header__nav-item--menu'
);
// console.log(testToHome);

const headerHomeBtn = document.querySelector('.header__nav-item');
const catalogueListFavoriteCocktails = document.querySelector(
  'body > main > div.favorite-cocktails-page > section > div > ul'
);

// Створюємо масив, який забирає масив із локал сторедж або пустий
let favoriteCocktailsEl = JSON.parse(localStorage.savedCocktails || '[]');

const catalogueListRef = document.querySelector('.catalogue__list');

if (catalogueListRef) {
  catalogueListRef.addEventListener('mousedown', onClickBtn);
}
// headerHomeBtn.addEventListener('click', onHomeBtnClickEvent);

// function onHomeBtnClickEvent() {
//   console.log('knock');
// }
let randomCardsGallery = '';
let htmlCoctailCard = '';

function onClickBtn(e) {
  if (e.target.classList.contains('btn__transparent')) {
    let BtnToFavoriteCocktails = '';
    randomCardsGallery = catalogueListRef.children; // Отримуємо масив карток

    for (let i = 0; i < randomCardsGallery.length; i++) {
      BtnToFavoriteCocktails = // Визначаємо де кнопка
        randomCardsGallery[i].children[1].children[1].children[1];
      // console.log(BtnToFavoriteCocktails);
      // console.log(randomCardsGallery[i]);

      BtnToFavoriteCocktails.addEventListener('click', allCocktailsMap); // Слухач по кліку
      e.target.childNodes[0].data = 'Remove'; // При натисканні на кнопку заміняємо слова

      function allCocktailsMap() {
        console.log('poly4ilocb');
        // Серіалізуємо в стрінгу
        htmlCoctailCard = new XMLSerializer().serializeToString(
          randomCardsGallery[i] // Масив об'єктів
        );
        // Перевірка якщо елемент не є в масиві
        if (!favoriteCocktailsEl.includes(htmlCoctailCard)) {
          favoriteCocktailsEl.push(htmlCoctailCard); // Пушим його в масив

          // Добавляєм його в розмітку
          catalogueListFavoriteCocktails.insertAdjacentHTML(
            //
            'beforeend',
            htmlCoctailCard
          );
        }

        // Добавляєм масив в локальне сховище
        localStorage.setItem(
          'savedCocktails',
          JSON.stringify(favoriteCocktailsEl)
        );
      }
    }
  }

  if (favoriteCocktailsEl.includes(htmlCoctailCard)) {
    const ops = setTimeout(() => {
      e.target.childNodes[0].data = ''; // При натисканні на кнопку заміняємо слова
    }, 500);
  }
}

//  Зберігаєм елементи в локальному сховищі при загрузці сторінки
const savedCocktailsDataLS = localStorage.getItem('savedCocktails');
const parsedCocktailsDataLS = JSON.parse(savedCocktailsDataLS).join('');

catalogueListFavoriteCocktails.insertAdjacentHTML(
  'beforeend',
  parsedCocktailsDataLS
);

// const btnLearnMore = document.querySelector(
//   'body > main > div.main-page > section.catalogue.container > div > ul'
// );

// btnLearnMore.addEventListener('click', onClickOfLearnMoreBtn);

// function onClickOfLearnMoreBtn() {
//   console.log(btnLearnMore);
// }

//  Отримуємо дані карточки ---------------------------------------------------------

// if (catalogueListRef) {
//   catalogueListRef.addEventListener('mousedown', onClickToAddFromLearnMore);
// }
// let learnMoreCocktailCard = '';
// function onClickToAddFromLearnMore(e) {
//   if (e.target.classList.contains('btn__orange')) {
//     console.log(e.target.offsetParent)
//     learnMoreCocktailCard = e.target.offsetParent.outerHTML;
//   }
// console.dir(learnMoreCocktailCard)
// //  Отримуємо дані карточки ---------------------------------------------------------

// const backdropModal = document.querySelector(
//   'body > main > div.main-page > section.catalogue.container > div > div.backdrop.is-hidden'
// );
// // console.dir(backdropModal);

// if (backdropModal) {
//   backdropModal.addEventListener('click', onClickModalBtn);
// }

// function onClickModalBtn(e) {
//   console.log('hello');
//   if (e.target.classList.contains('modal-first__button')) {
//     const modalBackdrop = document.querySelector(
//       'body > main > div.main-page > section.catalogue.container > div > div.backdrop > div'
//     );
//     const modalBtn = modalBackdrop.children[4]; // Отримав доступ до кнопки

//     // let arrayOfLearnMoreCard = [];
//     if (!favoriteCocktailsEl.includes(learnMoreCocktailCard)) {
//       favoriteCocktailsEl.push(learnMoreCocktailCard); // Пушим його в масив
//       favoriteCocktailsEl.join('');

//       // Добавляєм його в розмітку
//       catalogueListFavoriteCocktails.insertAdjacentHTML(
//         //
//         'beforeend',
//         learnMoreCocktailCard
//       );
//       localStorage.setItem(
//         'savedCocktails',
//         JSON.stringify(favoriteCocktailsEl)
//       );
//     }
//   }
// }
// ----------------------------------------------------------------------------------------------

//                          ----- Remove Button -----

if (catalogueListFavoriteCocktails) {
  catalogueListFavoriteCocktails.addEventListener('click', onRemoveItemBtn);
}
let htmlRemoveCoctailCard = '';

function onRemoveItemBtn(e) {
  // Отримуємо доступ до картки яку необхідно видалити
  // console.log(e.target);
  const cardToRemove = e.target.parentElement.parentElement.parentElement;
  // console.log(cardToRemove);

  if (e.target.classList.contains('btn__transparent')) {
    // Серіалізація до стрінги
    htmlRemoveCoctailCard = new XMLSerializer().serializeToString(cardToRemove);
    // Визначаємо індекс видаляємого елементу
    let indexForRemoveCocktailCard = favoriteCocktailsEl.indexOf(
      htmlRemoveCoctailCard
    );

    // Якщо масив включає видаляємий об'єкт видаляємо по індексу(Splice)
    if (favoriteCocktailsEl.includes(htmlRemoveCoctailCard)) {
      favoriteCocktailsEl.splice(indexForRemoveCocktailCard, 1);

      // Видаляємо картку з батьківського елементу
      cardToRemove.remove();
      // Видаляємо об'єкт з масиву в локальному сховищу
      localStorage.setItem(
        'savedCocktails',
        JSON.stringify(favoriteCocktailsEl)
      );
    }
  }
  // e.target.childNodes[0].data = 'Add to'; // При натисканні на кнопку заміняємо слова
}

//----------------------------------------------------------------------------------------------
