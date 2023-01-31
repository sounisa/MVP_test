const { Pool } = require("pg");

const dbConfig = {
    connectionString: process.env.DATABASE_URL
}

const client = new Pool(dbConfig);

module.exports = client;