var pokemonList = [{name:"Bulbasaur",height:0.7,type:["grass","poison"]},   //object containing Bulbasaur
                   {name:"Charmander",height:0.6,type:["fire"]},            //object containing Charmander
                   {name:"Pikachu",height:0.4,type:["electric"]}];          //object containing Pikachu

function stats_list(item) {
    document.write(item.name + " (height: " + String(item.height) + ") ");
    if (item.height > 0.6) {      //check pokemon size
        document.write("- Wow, that's big!<br>");
    }
    else {
        document.write("<br>");
    }
}

pokemonList.forEach(stats_list);