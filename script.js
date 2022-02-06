document.querySelector('input[type=submit]')
.addEventListener('click', () => {
    var quantidade = document.getElementById('quantidade');
    var quantidadeH3 = document.querySelector('.quantidadePokemons h3');
    pegaPokemons(quantidade.value);
    quantidadeH3.innerHTML = "Pokemons Listados" + " - " + quantidade.value;
    quantidade.value = ""
    
    if(quantidade.value == 0){
        document.querySelector('.pokemon-boxes').innerHTML = "";
    }

})

function pegaPokemons(quantidade){
   fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
   .then(response => response.json())
   .then(allpokemon => {

       var pokemons = [];

       allpokemon.results.map((val)=>{
           
           fetch(val.url)
           .then(response => response.json())
           .then(pokemonSingle => {
               pokemons.push({nome:val.name,imagem:pokemonSingle.sprites.front_default});
               

               if(pokemons.length == quantidade){
                   //Finalizamos nossas requisições.

                   
                   var pokemonBoxes = document.querySelector('.pokemon-boxes');
                   pokemonBoxes.innerHTML = "";

                  // console.log(pokemons);
                   pokemons.map(function(val){
                   pokemonBoxes.innerHTML+=`
                   
                    <div class="pokemon-box">
                        <img src="`+val.imagem+`" />
                        <p>`+val.nome+`</p>
                    </div>          
                   `;
   
                   })
               }
           })
       })
   })
}

document.querySelector('button[name=limpar]')
    .addEventListener('click', () => {
        document.querySelector('.pokemon-boxes').innerHTML = "";
        document.querySelector('.quantidadePokemons h3').innerHTML = "";

})