let pokemonRepository = (function () {
    var pokemonList = [];
    return {
        add: function(pokemon) {
          pokemonList.push(pokemon);
        },
        getAll: function() {
          return pokemonList;
        }
    }
})();

function list_name(item) {
    document.write(item.name + " (height: " + item.height + ") " + item.type + "<br>");
}

pokemonRepository.add({name:"Bulbasaur",height:0.7,type:["grass","poison"]});
pokemonRepository.add({name:"Charmander",height:0.6,type:["fire"]});
pokemonRepository.add({name:"Pikachu",height:0.4,type:["electric"]});
pokemonList = pokemonRepository.getAll();
pokemonList.forEach(list_name);