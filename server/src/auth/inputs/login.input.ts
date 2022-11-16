import { Field, InputType } from '@nestjs/graphql'
import { Length, IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class LoginInput {
  @IsString()
  @IsNotEmpty()
  @Field(returns => String)
  username: string

  @Length(6, 128)
  @Field(returns => String)
  password: string
}