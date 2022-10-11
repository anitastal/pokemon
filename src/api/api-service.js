const BASE_URL = 'http://pokeapi.co/api/v2';

export function fetchPokemon(pokemonId) {
  return fetch(`${BASE_URL}/pokemon/${pokemonId}`).then(response => {
    return response.json();
  });
}

// export function fetchRandomPokemon() {
//   return fetch(`${BASE_URL}/pokemon?limit=5`).then(response => {
//     return response.json();
//   });
// }
// console.log(fetchRandomPokemon());
