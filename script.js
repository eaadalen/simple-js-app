let pokemonRepository = (function () {
    var pokemonList = [{name:"Bulbasaur",height:0.7,type:["grass","poison"]},
                       {name:"Charmander",height:0.6,type:["fire"]},
                       {name:"Pikachu",height:0.4,type:["electric"]}];
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
          console.log(pokemon.name);
        },
        getAll: function() {
          return pokemonList;
        }
    }
})();

pokemonRepository.getAll().forEach(pokemonRepository.addListItem);