import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Admin {
  @Field(returns => ID)
  id: string
  
  @Field(returns => String)
  username: string | null

  password?: string | null

  @Field(returns => String)
  role?: string | null

  @Field(returns => Boolean)
  active?: boolean

  @Field(returns => ID, { nullable: true })
  owner: string | null

  @Field(returns => String)
  address?: string | null

  @Field(returns => Number)
  invitesCount?: number | null
}