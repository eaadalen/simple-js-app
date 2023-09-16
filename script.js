let pokemonRepository = (function () {
    var pokemonList = [{name:"Bulbasaur",height:0.7,type:["grass","poison"]},   //object containing Bulbasaur
                       {name:"Charmander",height:0.6,type:["fire"]},            //object containing Charmander
                       {name:"Pikachu",height:0.4,type:["electric"]}];          //object containing Pikachu
    return {
        add: function(pokemon) {
          pokemonList.push(pokemon);
        },
        getAll: function() {
          return pokemonList;
        }
    }
})();
