import { Field, ArgsType } from '@nestjs/graphql'

@ArgsType()
export class UsersArg {
  @Field(returns => String, { nullable: true })
  query: string

  @Field(returns => Number, { nullable: true, defaultValue: 20 })
  take: number

  @Field(returns => Number, { nullable: true, defaultValue: 0 })
  skip: number

  
}