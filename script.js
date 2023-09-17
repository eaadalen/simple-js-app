let pokemonRepository = (function () {
    var pokemonList = [{name:"Bulbasaur",height:0.7,type:["grass","poison"]},
                       {name:"Charmander",height:0.6,type:["fire"]},
                       {name:"Pikachu",height:0.4,type:["electric"]}];
    return {
        add: function(pokemon) {
          pokemonList.push(pokemon);
        },
        listPokemon: function(pokemon) {
          document.write(pokemon.name + " (height: " + pokemon.height + ") " + pokemon.type + "<br>");
        },
        getAll: function() {
          return pokemonList;
        }
    }
})();

pokemonRepository.getAll().forEach(pokemonRepository.listPokemon);