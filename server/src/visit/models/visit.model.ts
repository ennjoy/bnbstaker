import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Visit {
    @Field(returns => Date)
    createdAt: Date

    @Field(returns => ID)
    id: string

    @Field(returns => String)
    ip?: string | null
}