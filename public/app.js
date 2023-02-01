
getData()

//GET ALL
async function getData() {
    const response = await fetch('/pokemons')
    const data = await response.json() 
    console.log(data)
    showAllPokemons(data)
    //postData(data)
}

function showAllPokemons(data) {
    for (let i = 0; i < data.length; i++) {
        let pokeCard = document.createElement('span')
        pokeCard.className = "pokemon-card"
        pokeCard.id = data[i].name
        //if data[i].type === 'Grass' background style = green
        //let actualPoke = document.createElement('div')
        //actualPoke.className = "pokemon"
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
        pokeCard.appendChild(actualPoke)
        pokeContainer.appendChild(pokeCard)
        changeColor(data)
    }
}


function changeColor(data) {
    for (i = 0; i < data.length; i++){
        if (data[i].type.toLowerCase() === water){
            pokeCard.style.backgroundColor = "green";
        }
    }
}