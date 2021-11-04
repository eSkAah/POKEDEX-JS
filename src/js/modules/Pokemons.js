const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

/**
 * Fonction qui permet de récupérer les 151 premiers Pokemons
 */
export function getPokemons() {
 
  const list = pokemonMenu.getElementsByTagName('li');
  const searchInput = document.getElementById('searchInput');

 P.resource("https://pokeapi.co/api/v2/pokemon?limit=151") // with await, be sure to be in an async function (and in a try/catch)
  .then( (res) =>{
    let index = 0;


    res.results.forEach(pokemon => {
      index++
      let idSpan = document.createElement("span");

      const pokemonMenu = document.getElementById('pokemonMenu');
      const newPokemon = document.createElement('li');
      /// Input Filtre value
     
      newPokemon.textContent = pokemon.name.toUpperCase();

      newPokemon.prepend(idSpan);
      idSpan.textContent = "#"+index+" - ";

      newPokemon.style.fontWeight = "bold";
      newPokemon.dataset.id = index;
      pokemonMenu.appendChild(newPokemon);

      newPokemon.addEventListener('click', () => {
        getPokemon(pokemon.name);
      })
    })

    //Lors du clique déclenche la fonction anonyme de filtre de la liste des pokemons
    searchInput.addEventListener('keyup', () => {
      let filter = searchInput.value.toLowerCase();
      // console.log(list);
      for (var i = 0; i < list.length; i++) {
          let name = list[i].innerHTML;
          // console.log(name);
          if(name.toLowerCase().includes(filter)) list[i].style.display = 'list-item';
          else list[i].style.display = 'none';
      }
    })
  })
}

/**
 * 
 * @param {String} name 
 */
export function getPokemon(name){

  const pokemonImg = document.getElementById('pokemonImg');
  const pokemonType = document.getElementById('pokemonType');
    pokemonType.textContent = "Types : ";
  const pokemonAbilities = document.getElementById('pokemonAbilities');
    pokemonAbilities.textContent = "Abilities : | ";
  const pokemonName = document.getElementById('pokemonName');
  const pokemonWeight = document.getElementById('pokemonWeight');
  const pokemonHeight = document.getElementById('pokemonHeight');
  const fav = document.getElementById('fav');
  
  // API POKEMON REQUEST
  P.getPokemonByName(name)
  .then((res)=> {
    console.log(res)
    P.getEvolutionChainById(1).then(function (response) {
      console.log(response)
    })

    // POKEMON IMAGE
    pokemonImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + res.id + ".svg";
    // POKEMON NAME
    pokemonName.textContent = "#" + res.id + " " + (res.name).toUpperCase();
    // POKEMON TYPES
    for(let i = 0; i < res.types.length; i++){
      pokemonType.textContent += " " + (res.types[i].type.name).toUpperCase();
    }
    // POKEMON WEIGHT
      pokemonWeight.textContent = "Poids : " + res.weight + " Kg";
    // POKEMON HEIGHT
      pokemonHeight.textContent = "Taille : " + res.height + " cm";


    //POKEMON EVOLUTIONS
    
    P.resource("https://pokeapi.co/api/v2/evolution-chain/"+ res.id +"/",)
    .then( (res) => { 
      console.log(res);

      const evoList = document.getElementById('evoList');
        while(evoList.hasChildNodes()){
          evoList.removeChild(evoList.firstChild);
        }

      if((res.chain.evolves_to[0].evolves_to[0].species).name !== ""){
        let newDiv = document.createElement('li');
          newDiv.textContent = (res.chain.evolves_to[0].evolves_to[0].species).name;
          evoList.appendChild(newDiv);
      }

      if((res.chain.evolves_to[0].species).name !== ""){
        let newDiv = document.createElement('li');
          newDiv.textContent = (res.chain.evolves_to[0].species).name;
          evoList.appendChild(newDiv);
      }

    })










    /////////////////////////
    // Pokemon base stats //
    ////////////////////////

    const pokemonHp = document.getElementById('pokemonHp');
    const pokemonAtk = document.getElementById('pokemonAtk');
    const pokemonDef = document.getElementById('pokemonDef');
    const pokemonSpAtk = document.getElementById('pokemonSpAtk');
    const pokemonSpDef = document.getElementById('pokemonSpDef');
    const pokemonSpd = document.getElementById('pokemonSpd');
    const pokemonMoveList = document.getElementById('moveList');

    // POKEMON STAT HP
      pokemonHp.textContent = res.stats[0].base_stat + " " + res.stats[0].stat.name;
      pokemonHp.nextElementSibling.setAttribute("value", res.stats[0].base_stat);
    // POKEMON STAT ATK
      pokemonAtk.textContent = res.stats[1].base_stat + " " + res.stats[1].stat.name;
      pokemonAtk.nextElementSibling.setAttribute("value", res.stats[1].base_stat);
    // POKEMON STAT DEF
      pokemonDef.textContent = res.stats[2].base_stat + " " + res.stats[2].stat.name;
      pokemonDef.nextElementSibling.setAttribute("value", res.stats[2].base_stat);
    // POKEMON STAT SPATK
      pokemonSpAtk.textContent = res.stats[3].base_stat + " " + res.stats[3].stat.name;
      pokemonSpAtk.nextElementSibling.setAttribute("value", res.stats[3].base_stat);
    // POKEMON STAT SPDEF
      pokemonSpDef.textContent = res.stats[4].base_stat + " " + res.stats[4].stat.name;
      pokemonSpDef.nextElementSibling.setAttribute("value", res.stats[4].base_stat);
    // POKEMON STAT SPD
      pokemonSpd.textContent = res.stats[5].base_stat + " " + res.stats[5].stat.name;
      pokemonSpd.nextElementSibling.setAttribute("value", res.stats[5].base_stat);
    // POKEMON MOVELIST
      for(let i = 0; i < res.moves.length; i++){
        let newMove = document.createElement('li');
            newMove.textContent = res.moves[i].move.name;
        pokemonMoveList.appendChild(newMove);
      }
    // POKEMON ABILITIES
      for(let j = 0; j < res.abilities.length; j++){
        pokemonAbilities.textContent += " " + res.abilities[j].ability.name + " | ";
        
      }
    
  })

  //POKEMON RARITY
  P.resource([
    "https://pokeapi.co/api/v2/pokemon-species/" + name + "/",
  ]).then( (res) => {
    const infoWrapper = document.getElementById('infoWrapper')

    if(res[0].is_mythical){
      infoWrapper.classList.remove('legendary');
      infoWrapper.classList.add('mythic');
    }else if(res[0].is_legendary){
      infoWrapper.classList.remove('mythic');
      infoWrapper.classList.add('legendary');
    }else{
      infoWrapper.classList.remove('legendary')
      infoWrapper.classList.remove('mythic')
    }

  })

}

