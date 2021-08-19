# About
## Purpose
The purpose of this branch is to do the following for fun and learning  Nodejs, Typescript, and GraphQL:
- Pull Pikachu’s height and weight from: https://pokeapi.co/.
- Pull 5 favorite Pokemon’s height and weight from the API.
- Create an interface in GraphQL to be able to pull heights and weights for one or more Pokemon(s).
- Return mean, median, and mode from the interface  created in the previous item.

## GraphQL example query
```
query ExampleQuery {
  getPokemons {
    id
    name
    height
    weight
  }
  getPokemonStats {
    weight {
      mean
      median
      mode
    }
    height {
      mean
      median
      mode
    }
  }

}
```
## TODO
Continue to iterate and improve
- Remove common_data to use DB instead
