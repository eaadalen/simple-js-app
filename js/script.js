let pokemonRepository = (
  
function () {

    var pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
      let list = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
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
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      let height = document.createElement('p');
      height.innerText = "Height: " + String(pokemon.height);
      let image = document.createElement('img');
      image.src = pokemon.imageUrl;
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(height);
      modal.appendChild(image);
      modalContainer.appendChild(modal);
      modalContainer.classList.add("is-visible");
    }
  
    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains("is-visible")) {
        hideModal();  
      }
    });
    
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

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