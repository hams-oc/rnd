import { Field, ObjectType } from 'type-graphql'
import { PokemonWeightStat } from './PokemonWeightStat'
import { PokemonHeightStat } from './PokemonHeightStat'


@ObjectType()
export class PokemonStats {
  @Field(type => [PokemonWeightStat])
  weight: PokemonWeightStat[]

  @Field(type => [PokemonHeightStat])
  height: PokemonHeightStat[]

}
