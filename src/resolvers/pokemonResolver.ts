import { Query, Resolver } from 'type-graphql'
import { Pokemon } from '../schemas/Pokemon'
import { PokemonStats } from '../schemas/PokemonStats'
const fs = require('fs');

@Resolver((of) => PokemonStats)
export class PokemonResolver {
  private pokemons: Pokemon[] = []
  private pokemonStats: PokemonStats[] = []

  @Query((returns) => [Pokemon], { nullable: true })
  async getPokemons(): Promise<Pokemon[]> {
    //Read data
    const common_data = fs.readFileSync(
      './common_data/favorite-pokemons-stat.json',
       'utf8'
     )
    let has_data = this.pokemons.length > 0
    if (!has_data) {
      const favorite_pokemons_data = JSON.parse(common_data)
      this.pokemons.push(favorite_pokemons_data.pikachu[0])
      this.pokemons.push(favorite_pokemons_data.wailmer[0])
      this.pokemons.push(favorite_pokemons_data.bruxish[0])
      this.pokemons.push(favorite_pokemons_data.machamp[0])
      this.pokemons.push(favorite_pokemons_data.blastoise[0])
    }
    return await this.pokemons
  }

  @Query((returns) => [PokemonStats], { nullable: true })
  async getPokemonStats(): Promise<PokemonStats[]> {
    //Read data
    const common_data = fs.readFileSync(
      './common_data/favorite-pokemons-stat.json',
       'utf8'
     )

    let has_data = this.pokemonStats.length > 0
    if (!has_data) {
      const favorite_pokemons = JSON.parse(common_data)
      //Pokemon's weights
      const pikachu_weight = favorite_pokemons.pikachu[0].weight
      const wailmer_weight = favorite_pokemons.wailmer[0].weight
      const bruxish_weight = favorite_pokemons.bruxish[0].weight
      const machamp_weight = favorite_pokemons.machamp[0].weight
      const blastoise_weight = favorite_pokemons.blastoise[0].weight
      //Pokemon's heights
      const pikachu_height = favorite_pokemons.pikachu[0].height
      const wailmer_height = favorite_pokemons.wailmer[0].height
      const bruxish_height = favorite_pokemons.bruxish[0].height
      const machamp_height = favorite_pokemons.machamp[0].height
      const blastoise_height = favorite_pokemons.blastoise[0].height

      const stats = require("stats-lite")
      const all_weights = [
        pikachu_weight, wailmer_weight,
        bruxish_weight,
        machamp_weight,
        blastoise_weight,
      ]
      const all_heights = [
        pikachu_height, wailmer_height,
        bruxish_height,
        machamp_height,
        blastoise_height,
      ]

      const weight = {
        'mean': stats.mean(all_weights),
        'median': stats.median(all_weights),
        'mode': stats.mode(all_weights),
      }
      const height = {
        'mean': stats.mean(all_heights),
        'median': stats.median(all_heights),
        'mode': stats.mode(all_heights),
      }
      const pokemon_stats = {
        'weight': [weight],
        'height': [height],
      }
      this.pokemonStats.push(pokemon_stats)
    }
    return await this.pokemonStats
  }
}
