import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Message } from '../../message/models/message.model'

@ObjectType()
export class Client {
  @Field(returns => Date)
  createdAt: Date

  @Field(returns => Date)
  updatedAt: Date
  
  @Field(returns => ID)
  id: string

  @Field(returns => String, { nullable: true })
  ip?: string

  @Field(returns => String, { nullable: true })
  name?: string
  
  @Field(returns => [Message])
  messages?: Message[] | null

  @Field(returns => Boolean)
  active?: boolean
}