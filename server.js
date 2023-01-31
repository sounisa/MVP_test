const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const client = require('./db')

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



app.use(express.static('./public'));

//listener on port
app.listen(port,() => {
    console.log(`Listening on Port: ${port}`)
})
