const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const client = require('./db')
console.log(__dirname)

app.use(express.json()) //middleware PARSES JSON REQUESTS, gives access to parsed data in req.body
//route
app.route('/pokemons')
    .get(async (req, res) =>{
        try {
            const result = await client.query("SELECT * FROM pokemons")
            res.status(200).type('application/JSON').json(result.rows)
        } catch (error) {
            res.status(500).type('text/plain').send(error.message)//error from DB
        }
    })
    .post(async (req, res) =>{
        try {
            console.log(req.body)
            const body = req.body
            await client.query(`INSERT INTO pokemons (name, type, hp) VALUES ('${body.name}', '${body.type}', '${body.hp}')`); //creating
            res.status(200).type('application/json').json(body); 
        } catch (error) {
            res.status(500).type('text/plain').send(error.message)
        }
    })


app.use(express.static('./public'));

//listener on port
app.listen(port,() => {
    console.log(`Listening on Port: ${port}`)
})
