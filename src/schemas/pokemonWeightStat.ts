import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PokemonWeightStat {
  @Field()
  mean: number

  @Field()
  median: number

  @Field()
  mode: number

}
