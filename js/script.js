let pokemonRepository = (
  
function () {

    var pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
      let list = document.querySelector(".list-group");
      let listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      let button = document.createElement("button");
      button.classList.add("btn-primary");
      button.innerText = pokemon.name;
      listItem.appendChild(button);
      list.appendChild(listItem);
      button.addEventListener('click', function(){
        pokemonRepository.showDetails(pokemon);
      });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
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

    function showModal(pokemon) {
      let title = document.getElementById("modal-title");
      title.textContent = pokemon.name;
      let body = document.getElementById("modal-body");
      body.replaceChildren();
      let image = document.createElement("img");
      image.setAttribute("src", pokemon.imageUrl);
      image.setAttribute("alt","image of " + String(pokemon.name));
      body.appendChild(image);
      let height = document.createElement("p");
      height.innerText = "Height: " + String(pokemon.height);
      body.appendChild(height);
      $('#modal-container').modal('show');
    }

    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
      addListItem: addListItem,
      showDetails: showDetails,
    }
}

)();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});