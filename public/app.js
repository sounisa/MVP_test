
const postBtn = document.querySelector("#postbtn")
let deleteThis = document.querySelectorAll(".x")
console.log(document.querySelectorAll(".x"))
console.log(document.querySelector("#postbtn"))
getData()

$('#show').on('click', function () { //add new pokemon button
    $('.logo').hide();
    $('.center').show();
})



$('#close-postbtn').on('click', function () { //X on form
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
    addToData(data)
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


        let pokeContainer = document.querySelector('.all-pokemons-container')
        pokeCard.appendChild(deleteBtn)
        pokeCard.appendChild(pokeName)
        pokeCard.appendChild(pokeType)
        pokeCard.appendChild(pokeHp)

        let color = data[i].color
        changeColor(color, pokeCard) //changes color of font based off pokemon type
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
    postNewPokemon(newPokeName, newPokeType, newPokeHp)
    window.location.reload();
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
            "hp": newPokeHp,
            "color": assignColor(newPokeType),
            "img": assignLogo(newPokeType)
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

//change color of front
function changeColor(color, pokeCard){
    //if (color ===)
}

//assign color to pokemon type
function assignColor(newPokeType){
    if (newPokeType.toLowerCase() === "dark") {
         return '#5b5366' //rgba(91,83,102,255)
    } else if (newPokeType.toLowerCase() === 'water'){
        return '#3393dd' //rgba(51,147,221,255)
    } else if (newPokeType.toLowerCase() === 'fire') {
        return '#da2c33' //rgba(218,44,51,255)
    } else if (newPokeType.toLowerCase() === 'grass'){
        return '#02913a' //rgba(2,145,58,255)
    } else if (newPokeType.toLowerCase() === 'rock') {
        return '#c9b787' //rgba(201,183,135,255)
    } else if (newPokeType.toLowerCase() === 'normal') {
        return '#929ba3' //rgba(146,155,163,255)
    } else if (newPokeType.toLowerCase() === 'electric') {
        return '#fbd200' //rgba(251,210,0,255)
    } else {
        return 'black'
    }
    
}

function assignLogo(newPokeType){
    if (newPokeType.toLowerCase() === "dark") {
         return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/240px-Pok%C3%A9mon_Dark_Type_Icon.svg.png'
    } else if (newPokeType.toLowerCase() === 'water'){
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/240px-Pok%C3%A9mon_Water_Type_Icon.svg.png'
    } else if (newPokeType.toLowerCase() === 'fire') {
        return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl1m-a992d76d-bfa4-41cd-bff6-7546b47f2184.png/v1/fill/w_1280,h_1280,strp/fire_type_symbol_galar_by_jormxdos_dffvl1m-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwxbS1hOTkyZDc2ZC1iZmE0LTQxY2QtYmZmNi03NTQ2YjQ3ZjIxODQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DBmvPsi4hX6q3f8XHGcinkRbtbV2zsh5nB-_s9wse_4'
    } else if (newPokeType.toLowerCase() === 'grass'){
        return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl0s-d443a3b4-fa4e-47a6-99b4-d2a769785614.png/v1/fill/w_894,h_894,strp/grass_type_symbol_galar_by_jormxdos_dffvl0s-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwwcy1kNDQzYTNiNC1mYTRlLTQ3YTYtOTliNC1kMmE3Njk3ODU2MTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6-S1a0_YYhlP6eXW5QqrJk4jtv6b5a3MRuugxqhJ6EA'
    } else if (newPokeType.toLowerCase() === 'rock') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/240px-Pok%C3%A9mon_Rock_Type_Icon.svg.png'
    } else if (newPokeType.toLowerCase() === 'normal') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/240px-Pok%C3%A9mon_Normal_Type_Icon.svg.png'
    } else if (newPokeType.toLowerCase() === 'electric') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/240px-Pok%C3%A9mon_Electric_Type_Icon.svg.png'
    } else {
        return 'black'
    }
    
}


/*
electric: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/240px-Pok%C3%A9mon_Electric_Type_Icon.svg.png
water: https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/240px-Pok%C3%A9mon_Water_Type_Icon.svg.png
rock: https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/240px-Pok%C3%A9mon_Rock_Type_Icon.svg.png
fire:https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl1m-a992d76d-bfa4-41cd-bff6-7546b47f2184.png/v1/fill/w_1280,h_1280,strp/fire_type_symbol_galar_by_jormxdos_dffvl1m-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwxbS1hOTkyZDc2ZC1iZmE0LTQxY2QtYmZmNi03NTQ2YjQ3ZjIxODQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DBmvPsi4hX6q3f8XHGcinkRbtbV2zsh5nB-_s9wse_4
normal: https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/240px-Pok%C3%A9mon_Normal_Type_Icon.svg.png
grass: https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl0s-d443a3b4-fa4e-47a6-99b4-d2a769785614.png/v1/fill/w_894,h_894,strp/grass_type_symbol_galar_by_jormxdos_dffvl0s-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwwcy1kNDQzYTNiNC1mYTRlLTQ3YTYtOTliNC1kMmE3Njk3ODU2MTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6-S1a0_YYhlP6eXW5QqrJk4jtv6b5a3MRuugxqhJ6EA
fighting: https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/240px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png
dark: https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/240px-Pok%C3%A9mon_Dark_Type_Icon.svg.png

*/ 