let pokemonRepository = (function () {
    var pokemonList = [];
    return {
        add: function(pokemon) {
          pokemonList.push(pokemon);
        },
        addListItem: function(pokemon) {
          let list = document.querySelector(".pokemon-list");
          let listItem = document.createElement("li");
          let button = document.createElement("button")
          button.innerText = pokemon.name;
          button.classList.add("button-class");
          listItem.appendChild(button);
          list.appendChild(listItem);
          button.addEventListener('click', function(){
            pokemonRepository.showDetails(pokemon);
          });
        },
        showDetails: function(pokemon) {
          pokemonRepository.loadDetails(pokemon);
        },
        loadDetails: function(pokemon) {
          fetch(pokemon.url).then(function (HTTP_response) {
            return HTTP_response.json();
          }).then(function (json_response) {
            pokemon["height"] = json_response.height;
            //pokemon["imgURL"] = [json_response.imgURL];   Can't find imgURL attribute in pokemon json file
            console.log(pokemon);
            return pokemon
          }).catch(function () {
            console.log("An error occurred in fetching the data to load pokemon details");
          });
        },
        loadList: function() {
          fetch("https://pokeapi.co/api/v2/pokemon/?limit=1500").then(function (HTTP_response) {
            return HTTP_response.json();
          }).then(function (json_response) {
            json_response.results.forEach(pokemonRepository.add);
            return true;
          }).catch(function () {
            console.log("An error occurred in fetching the data to load pokemon list");
            return "error";
          });
        },
        getAll: function() {
          return pokemonList;
        }
    }
})();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  pokemonRepository.loadList();
  await sleep(100);
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
}

demo();