import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Currency {

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

@ObjectType()
export class Available {

  @Field(returns => Currency, { nullable: true })
  invested: Currency | null

  @Field(returns => Currency, { nullable: true })
  withdrawn: Currency | null

}