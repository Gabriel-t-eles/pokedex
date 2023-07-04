const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton') 

const maxRecord = 151
const limit = 10
let offset = 0;


// 1, 2, 3, 4, 5           0-5
// 6, 7, 8, 9, 10          5-5
// 11                      10-1(remove o botao)

function loadPokemonItens(offset, limit){
    pokeApi.gatPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                        <span class="numero">#${pokemon.number}</span>
                        <span class="nome">${pokemon.name}</span>
                       
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join(' ')}
                            </ol>
                           
                            <img src="${pokemon.photo}" 
                                 alt="${pokemon.name}">
                        </div>
                    </li>
                `
        ).join('')


        pokemonList.innerHTML += newHtml
    })
}
  
loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if(qtdRecordsWithNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset,limit)
    }
})
