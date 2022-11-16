import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Client } from '../../client/models/client.model'

@ObjectType()
export class Message {
  @Field(returns => Date)
  createdAt: Date

  @Field(returns => Date)
  updatedAt: Date
  
  @Field(returns => ID)
  id: string
  
  @Field(returns => String, { nullable: true })
  content: string | null

  clientId?: string | null
  
  @Field(returns => Client)
  client?: Client | null

  @Field(returns => String, { nullable: true })
  senderId?: string | null
}