import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Pokemon {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  height: number

  @Field()
  weight: number

}
