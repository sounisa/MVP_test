
getData()

//GET ALL
async function getData() {
    const response = await fetch('/pokemons')
    const data = await response.json() 
    console.log(data)
    showAllPokemons(data)

}


function showAllPokemons(data) {
    for (let i = 0; i < data.length; i++) {
        let pokeCard = document.createElement('span')
        pokeCard.className = "pokemon-card"
        pokeCard.id = data[i].name
        let actualPoke = document.createElement('div')
        actualPoke.className = "pokemon"
        let pokeName = document.createElement('h1')
        pokeName.className = "pokemonName"
        pokeName.textContent = data[i].name
        let pokeType = document.createElement('h3')
        pokeType.className = "pokemonType"
        pokeType.textContent = data[i].type
        let pokeHp = document.createElement('h3')
        pokeHp.className = "pokemonHp"
        pokeHp.textContent = data[i].hp
        let pokeContainer = document.getElementsByClassName('all-pokemons-container')
        actualPoke.appendChild(pokeName)
        actualPoke.appendChild(pokeType)
        actualPoke.appendChild(pokeHp)
        pokeCard.appendChild(actualPoke)
        pokeContainer.appendChild(pokeCard)
    }
}

