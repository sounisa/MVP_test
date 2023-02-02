
const postBtn = document.querySelector("#postbtn")
getData()

//GET ALL
async function getData() {
    const response = await fetch('/pokemons')
    const data = await response.json() 
    console.log(data)
    showAllPokemons(data)
    addToData(data)
    //postData(data)
}

function showAllPokemons(data) {
    for (let i = 0; i < data.length; i++) {
        let pokeCard = document.createElement('span')
        pokeCard.className = "pokemon-card"
        pokeCard.id = data[i].name
        let pokeName = document.createElement('div')
        pokeName.className = "pokeName"
        pokeName.textContent = data[i].name
        let pokeType = document.createElement('div')
        pokeType.className = "pokeType"
        pokeType.textContent = data[i].type
        let pokeHp = document.createElement('div')
        pokeHp.className = "pokeHp"
        pokeHp.textContent = `${data[i].hp} HP`
        let pokeContainer = document.querySelector('.all-pokemons-container')
        pokeCard.appendChild(pokeName)
        pokeCard.appendChild(pokeType)
        pokeCard.appendChild(pokeHp)
        pokeContainer.appendChild(pokeCard)
    }
}

//event listener on NEW pokemon button, get their values
postBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const newPokeName = document.getElementById('pokemon-name').value
    const newPokeType = document.getElementById('pokemon-type').value
    const newPokeHp = document.getElementById('pokemon-hp').value

    postNewPokemon(newPokeName, newPokeType, newPokeHp)
});

async function postNewPokemon(newPokeName, newPokeType, newPokeHp) {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "name": newPokeName,
            "type": newPokeType,
            "hp": newPokeHp
        })
    }
    const response = await fetch('/pokemons', options)
    const newData = await response.json()
}


