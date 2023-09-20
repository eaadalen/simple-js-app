let pokemonRepository = (function () {
    var pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1500';
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
    function addListItem(pokemon) {
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
    }
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    function getAll() {
      return pokemonList;
    }
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
      addListItem: addListItem,
      showDetails: showDetails
    }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});