// import Notiflix from 'notiflix';
// const BASE_URL = ' https://restcountries.com/v3.1/name';

// // вытянули базу данных из апи
// export const fetchCountries = url => {
//   return fetch(
//     `${BASE_URL}/${url}?fields=name,capital,population,flags,languages`
//   ).then(responce => {
//     if (!responce.ok) {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//     }
//     return responce.json();
//   });
// };
