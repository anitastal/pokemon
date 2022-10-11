import pokemonTmp from './pokemon.hbs';
// import API from './api/api-service';
import { fetchPokemon, fetchRandomPokemon } from './api/api-service';
import getRefs from './api/get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  console.log(form.elements);
  const searchQuery = form.elements.query.value;

  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => {
      console.log(error);
    })
    .finally(() => form.reset());
}

function renderPokemonCard(pokemon) {
  const markUp = pokemonTmp(pokemon);
  console.log(markUp);
  refs.card.innerHTML = markUp;
}

// +++++++++++++++++++++++++++++++++++++++++++++++++

// window.addEventListener('load', randomePokemon);

// function randomePokemon() {
//   fetchRandomPokemon()
//     .then(renderPokemonCard)
//     .catch(error => {
//       console.log(error);
//     });
//   // .finally(() => form.reset());
// }

function GetPokemons() {
  fetch(`http://pokeapi.co/api/v2/pokemon?limit=5`)
    .then(r => r.json())
    .then(renderPokemonCard(r));
}
GetPokemons();
// function renderPokemonCard(pokemon) {
//   const markUp = pokemonTmp(pokemon);
//   // console.log(markUp);
//   refs.card.innerHTML = markUp;
// }
