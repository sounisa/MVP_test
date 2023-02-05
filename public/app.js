const postBtn = document.querySelector("#postbtn")
let deleteThis = document.querySelectorAll(".x")
let editForm = document.querySelector('.editHideForm')
let pokemonEditing = document.querySelector('.nameOfPokemonEditing')
let editSubmitBtn = document.querySelector('#editBtnSubmit')


getData()

$('#show').on('click', () => {
    $('#show').hide();
    $('.logo').hide();
    $('.center').show();
})


$('#close-editbtn').on('click', () => {
    $('.editHideForm').hide();
    $('.logo').show();
    $('#show').show();
})

$('.home-container').on('click', () => {
    window.location.reload(true);
} )

$('#close-postbtn').on('click', () => {
    $('.center').hide();
    $('.logo').show();
    $('#show').show();
})

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
        let pokeCard = document.createElement('span') //PokemonCard 
        pokeCard.className = "pokemon-card"
        pokeCard.id = data[i].name
        let pokeName = document.createElement('div')//Pokemon's Name
        pokeName.className = "pokeName"
        pokeName.textContent = data[i].name
        let pokeType = document.createElement('div')//Pokemon's Type
        pokeType.className = "pokeType"
        pokeType.textContent = data[i].type
        let pokeHp = document.createElement('div')//Pokemon's HP
        pokeHp.className = "pokeHp"
        pokeHp.textContent = `${data[i].hp} HP`
        let deleteBtn = document.createElement('button')//delete button
        deleteBtn.className= "x"
        deleteBtn.id = data[i].id
        deleteBtn.textContent = "X"
        addListenerToDeleteButton(deleteBtn)//add listener to each delete button
        let editBtn = document.createElement('button')//edit button
        editBtn.className= "edit"
        editBtn.id = data[i].id
        editBtn.title = data[i].name
        editBtn.textContent = "Edit Pokemon"
        addListenerToEditButton(editBtn)//add listener to edit button
        let pokeContainer = document.querySelector('.all-pokemons-container')
        pokeCard.appendChild(editBtn)
        pokeCard.appendChild(deleteBtn)
        pokeCard.appendChild(pokeName)
        pokeCard.appendChild(pokeType)
        pokeCard.appendChild(pokeHp)
        pokeCard.style.color = data[i].color
        pokeContainer.appendChild(pokeCard)
    }
}
//add New Pokemon Button, get values, post new pokemon
postBtn.addEventListener("click", function (e) {
    e.preventDefault();
    $('.center').hide();
    $('.logo').show();
    $('#show').show();
    const newPokeName = document.getElementById('pokemon-name').value
    const newPokeType = document.getElementById('pokemon-type').value
    const newPokeHp = document.getElementById('pokemon-hp').value
    alert(`${newPokeType} Type Pokemon: ${newPokeName} with HP: ${newPokeHp} was added to your Pokedex`)
    $('#testCard').remove();
    postNewPokemon(newPokeName, newPokeType, newPokeHp)
});
//POST
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
    console.log(newData)
    window.location.reload(true);
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
    const sqlQuery = await response.json() 
    const dataAfterDelete = await response.json() 
}


function addListenerToEditButton(editBtn) {
    editBtn.addEventListener("click", function (e) {
        $('.editHideForm').show()
        $('.logo').hide();
        $('#show').hide();
        editForm.id = editBtn.id
        pokemonEditing.textContent = editBtn.title
    })
}

editSubmitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    $('.editHideForm').hide();
    $('.logo').show();
    $('#show').show();
    const editPokeName = document.getElementById('editPokemonName').value
    const editPokeType = document.getElementById('editPokemonType').value
    const editPokeHp = document.getElementById('editPokemonHp').value
    const idOfEditPokemon = editForm.id
    //alert(`${newPokeType} Type Pokemon: ${newPokeName} with HP: ${newPokeHp} was added to your Pokedex`)
    editPokemon(editPokeName, editPokeType, editPokeHp, idOfEditPokemon)
});


async function editPokemon(editPokeName, editPokeType, editPokeHp, idOfEditPokemon) {
    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "name": editPokeName,
            "type": editPokeType,
            "hp": editPokeHp
        })
    }
    console.log(options.body)
    const response = await fetch(`/pokemons/${idOfEditPokemon}`, options)
    const newData = await response.json()
    console.log(newData)
    window.location.reload(true);
}

// //assign logo
// function assignLogo(newPokeType){
//     if (newPokeType.toLowerCase() === "dark") {
//          return 'Dark.png'
//     } else if (newPokeType.toLowerCase() === 'water'){
//         return 'water.png'
//     } else if (newPokeType.toLowerCase() === 'fire') {
//         return 'fire.png'
//     } else if (newPokeType.toLowerCase() === 'grass'){
//         return 'grass.png'
//     } else if (newPokeType.toLowerCase() === 'rock') {
//         return 'rock.png'
//     } else if (newPokeType.toLowerCase() === 'normal') {
//         return 'normal.png'
//     } else if (newPokeType.toLowerCase() === 'electric') {
//         return 'electric.png'
//     } else {
//         return 'pokeball.png'
//     }
    
// }