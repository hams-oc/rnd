import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PokemonHeightStat {
  @Field()
  mean: number

  @Field()
  median: number

  @Field()
  mode: number

}
