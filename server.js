const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const client = require('./db')
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors")

app.use(cors({origin: "*",}))
app.use(express.json()) 

app.route('/pokemons')
    .get(async (req, res) =>{
        try {
            let allPokemons = await client.query("SELECT * FROM pokemons")
            res.status(200).type('application/JSON').json(allPokemons.rows)
        } catch (error) {
            res.status(500).type('text/plain').send(error.message)
        }
    })
    .post(async (req, res) =>{
        let { body } = req
        try {
            await client.query(`INSERT INTO pokemons (name, type, hp) VALUES ('${body.name}', '${body.type}', '${body.hp}')`); //creating
            res.status(200).type('application/json').json(body); 
        } catch (error) {
            res.status(500).type('text/plain').send(error.message)
        }
    })

app.route('/pokemons/:id')
    .get(async (req, res) => {
        let { id } = req.params
        if (isNaN(id)) {
            res.status(404).type('text/plain').send('Not found')
        } else { 
            try { 
                let onePokemon = await client.query(`SELECT * FROM pokemons WHERE id = ${id}`); 
                if (onePokemon.rows.length === 0) { //if id doesn't exist
                    res.status(404).type('text/plain').send('Not found')
                } else {
                    res.status(200).type('application/JSON').json(onePokemon.rows)
                }                      
            } catch (error) {
                res.status(500).type('text/plain').send(error)
            }
        }  
    })
    
    .patch(async (req, res) => {
        const { id } = req.params
        const { body } = req
        try {
            const result = await client.query(`SELECT * FROM pokemons WHERE id = ${id}`); 
            if (result.rows.length === 0) {
                res.status(404).type('text/plain').send('Not found')
            } else {
                for (key in body) { 
                    await client.query(`UPDATE pokemons SET ${key} = '${body[key]}' WHERE id = ${id}`); 
                }
                const updatedPokemon = await client.query(`SELECT * FROM pokemons WHERE id = ${id}`); 
                res.status(200).type('application/JSON').json(updatedPokemon.rows) 
            }   
        } catch (error) {
            console.log(error.stack)
            res.status(500).type('text/plain').send(error.message)
        } 
    })

    .delete(async (req, res) => {
        const { id } = req.params
        if (isNaN(id)) {
            res.status(404).type('text/plain').send('Not found')
        } else { 
            try { 
                const result = await client.query(`SELECT * FROM pokemons WHERE id = ${id}`); 
                if (result.rows.length === 0) { 
                    res.status(404).type('text/plain').send('Not found')
                } else {
                    const deletePokemon = await client.query(`DELETE FROM pokemons WHERE id = ${id}`); 
                    res.status(200).type('application/JSON').json(result.rows) 
                }                      
            } catch (error) {
                res.status(500).type('text/plain').send(error)
            }
        }
    })


app.use(express.static('./public'));


app.listen(port,() => {
    console.log(`Listening on Port: ${port}`)
})
