var pokemonList = [{name:"Bulbasaur",height:0.7,type:["grass","poison"]},   //object containing Bulbasaur
                   {name:"Charmander",height:0.6,type:["fire"]},            //object containing Charmander
                   {name:"Pikachu",height:0.4,type:["electric"]}];          //object containing Pikachu

for (let i = 0; i < pokemonList.length; i++) {  //Print out pokemon
    document.write(pokemonList[i].name + " (height: " + String(pokemonList[i].height) + ") ");
    if (pokemonList[i].height > 0.6) {      //check pokemon size
        document.write("- Wow, that's big!<br>");
    }
    else {
        document.write("<br>");
    }
}