import { Field, ArgsType } from '@nestjs/graphql'

@ArgsType()
export class UpdatePlanArg {
  @Field(returns => String, { nullable: true })
  address: string

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