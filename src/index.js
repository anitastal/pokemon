import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

// находим инпут
const searchInput = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

// вешаем слушателя и добавляем задаержку из библиотеки
searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

// функция получения данных страны
function getCountryData(e) {
  const countryName = e.target.value.trim();
  resetMarkup(countryList);
  resetMarkup(countryInfo);
  if (!countryName) {
    return;
  }

  // на основе базы стран делаем проверку
  // есди длина массива строго равняется 1 стране
  // тогда выполняется функция выведения страны(markupCountry)
  // дата это массив стран
  fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        markupCountry(data[0]);
      }
      // если от 2 до 10 стран то только 3 реквизита
      else if (data.length >= 2 && data.length <= 10) {
        markupCountries(data);
      }
      // в противном случаем выводим сообшение
      else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      alert(err);
    });
}

// создаем разметку для одной страны
function markupCountry(countryData) {
  console.log(countryData);
  const { flags, name, capital, population, languages } = countryData;
  const lang = Object.values(languages).join(', ');

  return countryInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <img src=${flags.svg} alt=${name.official} width="75"/>
        <span>${name.official}</span>
    </div>
    <ul>
        <li class=list>
            <span class=country>Capital:</span> ${capital}</li>
        <li class=list>
            <span class=country>Population:</span> ${population}</li>
        <li class=list>
            <span class=country>Languages:</span> ${lang}</li>
    </ul>
    `
  );
}
// создаем разметку для стран
function markupCountries(countryData) {
  countryData.map(country => {
    const { flags, name } = country;
    return countryList.insertAdjacentHTML(
      'beforeend',
      `<li class=list>
        <img src=${country.flags.svg} alt=${country.name.official} width="75"/>
        <span>${country.name.official}</span>
    </li>`
    );
  });
}
// фукнкция очистки перед вводом
function resetMarkup(element) {
  element.innerHTML = '';
}
