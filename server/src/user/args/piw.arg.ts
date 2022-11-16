import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PiwArg {

  @Field(returns => Number, { nullable: true })
  bnb: number

  @Field(returns => Number, { nullable: true })
  eth: number

  @Field(returns => Number, { nullable: true })
  busd: number

  @Field(returns => Number, { nullable: true })
  usdt: number

  @Field(returns => Number, { nullable: true })
  cake: number

  @Field(returns => Number, { nullable: true })
  ada: number

  @Field(returns => Number, { nullable: true })
  shiba: number

  @Field(returns => Number, { nullable: true })
  doge: number
}