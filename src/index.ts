import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from "express"
import { request, gql } from 'graphql-request'
import { buildSchema } from 'type-graphql'

import { PokemonResolver } from './resolvers/pokemonResolver'

async function main() {
  const schema = await buildSchema({
      resolvers: [PokemonResolver],
      emitSchemaFile: true,
      nullableByDefault: true,
    })

  const fs = require('fs');

  //express initialization
  const app = Express();

  //ApolloServer initialization
  const server = new ApolloServer({
    schema,
  })

  await server.start();
  server.applyMiddleware({ app })

  //PORT
  const PORT:number = 4000;
  //POKEAPI V1 Beta GraphQL endpoint
  const POKEAPI_V1_BETA_GRAPHQL:string = 'https://beta.pokeapi.co/graphql/v1beta'

  // Query pikachu's height and weight via pokeapi Graphql
  const pikachu_query = gql`{
    pikachu: pokemon_v2_pokemon(where: {name: {_eq: "pikachu"}}) {
     id
     name
     height
     weight
    }
  }`
  // Query favorite pokemons using Alias: Pikachu, wailmer,
  // Bruxish, Machamp, and Blastoise
  const favorite_pokemons_query = gql`{
    pikachu : pokemon_v2_pokemon(where: {name: {_eq: "pikachu"}}) {
     id
     name
     height
     weight
    }
    wailmer : pokemon_v2_pokemon(where: {id: {_eq: 320}}) {
      id
      name
      height
      weight
    }
    bruxish:  pokemon_v2_pokemon(where: {id: {_eq: 779}}) {
      id
      name
      height
      weight
    }
    machamp:  pokemon_v2_pokemon(where: {id: {_eq: 68}}) {
      id
      name
      height
      weight
    }
    blastoise: pokemon_v2_pokemon(where: {id: {_eq: 9}}) {
      id
      name
      height
      weight
    }
  }`
  request(
    POKEAPI_V1_BETA_GRAPHQL, pikachu_query)
    .then(data => {
       fs.writeFileSync('./common_data/pikachu-stat.json',
       JSON.stringify(data))
      }
    )

  request(
    POKEAPI_V1_BETA_GRAPHQL, favorite_pokemons_query)
     .then(data => {
        fs.writeFileSync('./common_data/favorite-pokemons-stat.json',
        JSON.stringify(data))
       }
     )


  //localhost setup
  app.listen(PORT, () => {
    console.log("Graphql server now up at port 4000")
  });
}
main()
