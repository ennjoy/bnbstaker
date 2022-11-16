import { Field, ArgsType, ID } from '@nestjs/graphql'
import { IsNotEmpty, Min, Max } from 'class-validator'

@ArgsType()
export class ApproveArg {
  @IsNotEmpty()
  @Field(returns => ID)
  id: string

  @Min(0)
  @Max(20)
  @Field(returns => Number)
  approve: number
}