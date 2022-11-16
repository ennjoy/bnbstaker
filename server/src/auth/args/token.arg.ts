import { ArgsType, Field } from '@nestjs/graphql'
import { IsJWT, IsNotEmpty } from 'class-validator'

@ArgsType()
export class TokenArg {
  @IsNotEmpty()
  @IsJWT()
  @Field(returns => String)
  token: string
}