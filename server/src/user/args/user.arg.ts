import { Field, ArgsType } from '@nestjs/graphql'
import { IsEthereumAddress } from 'class-validator'
import { PiwArg } from './piw.arg'

@ArgsType()
export class UserArg {
  @Field(returns => String, { nullable: true })
  owner: string

  @IsEthereumAddress()
  @Field(returns => String)
  address: string

}