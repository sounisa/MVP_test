const { Pool } = require('pg')
const dotenv = require("dotenv");
dotenv.config();

const client = new Pool({ 
    connectionString: process.env.LOCAL
});

module.exports = client;