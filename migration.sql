DROP TABLE IF EXISTS pokemons;

CREATE TABLE pokemons(
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR NOT NULL,
   type VARCHAR NOT NULL,
   hp INT NOT NULL,
   color VARCHAR NOT NULL
);