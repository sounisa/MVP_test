const postBtn = document.querySelector("#postbtn")
let deleteThis = document.querySelectorAll(".x")

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

        let pokeCard = document.createElement('span') //PokemonCard 
        pokeCard.className = "pokemon-card"
        pokeCard.id = data[i].name

        let pokeName = document.createElement('div')//Pokemon's Name
        pokeName.className = "pokeName"
        pokeName.textContent = data[i].name

        let pokeType = document.createElement('div')//Pokemon's Type
        pokeType.className = "pokeType"
        pokeType.textContent = data[i].type.toUpperCase()

        let pokeHp = document.createElement('div')//Pokemon's HP
        pokeHp.className = "pokeHp"
        pokeHp.textContent = `${data[i].hp} HP`

        let pokeImg = document.createElement ('img')//Pokemon's Type Img
        pokeImg.className = 'pokeImg'
        pokeImg.src = data[i].img

        let deleteBtn = document.createElement('button')//delete button
        deleteBtn.className= "x"
        deleteBtn.id = data[i].id
        deleteBtn.textContent = "X"
        addListenerToDeleteButton(deleteBtn)//add listener to each delete button


        let pokeContainer = document.querySelector('.all-pokemons-container')
        pokeCard.appendChild(deleteBtn)
        pokeCard.appendChild(pokeName)
        pokeCard.appendChild(pokeImg)
        pokeCard.appendChild(pokeType)
        pokeCard.appendChild(pokeHp)

        let color = data[i].color
        pokeCard.style.color = `#${data[i].color}` //changes color of font based off pokemon type
        pokeContainer.appendChild(pokeCard)
    }
}

$('#show').on('click', function () { //add new pokemon button
    $('.logo').hide();
    $('.center').show();
})


//add New Pokemon Button, get values, post new pokemon
postBtn.addEventListener("click", function (e) {
    e.preventDefault();
    $('.center').hide();
    $('.logo').show();
    $('#show').show();
    const newPokeName = document.getElementById('pokemon-name').value
    const newPokeType = document.getElementById('pokemon-type').value
    const newPokeHp = document.getElementById('pokemon-hp').value
    alert(`${newPokeType} Type Pokemon: ${newPokeName} with ${newPokeHp}HP was added to your Pokedex`)
    postNewPokemon(newPokeName, newPokeType, newPokeHp)
});

$('#close-postbtn').on('click', function () { //X on form
    $('.center').hide();
    $('.logo').show();
    $('#show').show();
})

//POST
const postNewPokemon = async (newPokeName, newPokeType, newPokeHp) => {
    let color = assignColor(newPokeType)
    let logo = assignLogo(newPokeType)
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "name": `${newPokeName}`,
            "type": `${newPokeType}`,
            "hp": `${newPokeHp}`,
            "color": `${color}`,//calls assigncolor function
            "img": `${logo}` //calls assignlogo function
        })
    }
    const response = await fetch('/pokemons', options)
    const newData = await response.json()
}

//adds event listener to x attached to that pokemoncard, if clicked, deletes pokemon
function addListenerToDeleteButton(deleteBtn) {
    deleteBtn.addEventListener("click", function (e) {
        $(deleteBtn).closest('span').remove();
        deletePokemon(deleteBtn)
    })
}


//DELETE 1
async function deletePokemon(deleteBtn) {
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(`/pokemons/${deleteBtn.id}`, options)
    const dataAfterDelete = await response.json() 
    console.log(dataAfterDelete)
}



//assign color to pokemon type
function assignColor(newPokeType){
    if (newPokeType.toLowerCase() === "dark") {
         return '5b5366' //rgba(91,83,102,255)
    } else if (newPokeType.toLowerCase() === 'water'){
        return '3393dd' //rgba(51,147,221,255)
    } else if (newPokeType.toLowerCase() === 'fire') {
        return 'da2c33' //rgba(218,44,51,255)
    } else if (newPokeType.toLowerCase() === 'grass'){
        return '02913a' //rgba(2,145,58,255)
    } else if (newPokeType.toLowerCase() === 'rock') {
        return 'c9b787' //rgba(201,183,135,255)
    } else if (newPokeType.toLowerCase() === 'normal') {
        return '929ba3' //rgba(146,155,163,255)
    } else if (newPokeType.toLowerCase() === 'electric') {
        return 'fbd200' //rgba(251,210,0,255)
    } else {
        return 'black'
    }
    
}
//assign logo
function assignLogo(newPokeType){
    if (newPokeType.toLowerCase() === "dark") {
         return 'Dark.png'
    } else if (newPokeType.toLowerCase() === 'water'){
        return 'water.png'
    } else if (newPokeType.toLowerCase() === 'fire') {
        return 'fire.png'
    } else if (newPokeType.toLowerCase() === 'grass'){
        return 'grass.png'
    } else if (newPokeType.toLowerCase() === 'rock') {
        return 'rock.png'
    } else if (newPokeType.toLowerCase() === 'normal') {
        return 'normal.png'
    } else if (newPokeType.toLowerCase() === 'electric') {
        return 'electric.png'
    } else {
        return 'pokeball.png'
    }
    
}


