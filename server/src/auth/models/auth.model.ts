import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth {
  @Field(returns => String)
  accessToken: string | null

  @Field(returns => String)
  refreshToken: string | null
}