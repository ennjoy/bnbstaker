import { Field, InputType, ID } from '@nestjs/graphql'
import { AdminRole } from '@prisma/client'
import { Length, IsString, IsEthereumAddress } from 'class-validator'

@InputType()
export class SignupInput {
  @IsString()
  @Length(4, 128)
  @Field(returns => String)
  username: string

  @IsString()
  @Length(6, 128)
  @Field(returns => String)
  password: string

  @IsEthereumAddress()
  @Field(returns => String)
  address: string

  @Field(returns => ID, { nullable: true })
  owner?: string

  @Field(returns => String)
  role?: AdminRole | null
}