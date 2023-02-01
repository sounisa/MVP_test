const { Pool } = require("pg");

const dbConfig = {
    connectionString: process.env.LOCAL
}

const client = new Pool(dbConfig);

module.exports = client;