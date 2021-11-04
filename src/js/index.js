import { getPokemon, getPokemons } from "./modules/Pokemons";
const filter = document.getElementById('filter');

getPokemons();
getPokemon("bulbasaur");

filter.addEventListener('change', () => {

  let pokemonList = pokemonMenu.getElementsByTagName('li');
      pokemonList = [...pokemonList];//Array convert
  const filterMode = filter.options[filter.selectedIndex].value;

  switch (filterMode){

    case '1':
      pokemonList.sort((a, b) =>{
        return a.dataset.id -b.dataset.id;
      });
      updateFilter(pokemonList);
      break;

    case '2':
      
      pokemonList.sort((a, b) =>{
        return a.textContent.localeCompare(b.textContent);
      });
      updateFilter(pokemonList);
      break;

    case '3':

      pokemonList.sort((a, b) =>{
        return b.textContent.localeCompare(a.textContent);
      });
      updateFilter(pokemonList);
      break;
  }



})


/**
 * Réorganise le tableau en fonction des parametres de filtres 
 * @param {Array} list 
 */
  function updateFilter(list){
    for(var i = 0; i < list.length; i++) {
      var parent = list[i].parentNode;
      var detatchedItem = parent.removeChild(list[i]);
      parent.appendChild(detatchedItem);
    }
  }
  
