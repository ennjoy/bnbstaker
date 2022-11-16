import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Log {
    @Field(returns => Date)
    createdAt: Date

    @Field(returns => Date)
    updatedAt: Date

    @Field(returns => ID)
    id: string
    
    @Field(returns => String)
    ip?: string | null

    @Field(returns => String)
    agent?: string | null
}