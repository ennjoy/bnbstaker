import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Piw {

  @Field(returns => Number, { nullable: true })
  bnb: number | null

  @Field(returns => Number, { nullable: true })
  eth: number | null

  @Field(returns => Number, { nullable: true })
  busd: number | null

  @Field(returns => Number, { nullable: true })
  usdt: number | null

  @Field(returns => Number, { nullable: true })
  cake: number | null

  @Field(returns => Number, { nullable: true })
  ada: number | null

  @Field(returns => Number, { nullable: true })
  shiba: number | null

  @Field(returns => Number, { nullable: true })
  doge: number | null

}