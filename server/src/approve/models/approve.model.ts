import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from '../../user/models/user.model'

@ObjectType()
export class Approve {
    @Field(returns => Date)
    createdAt: Date

    @Field(returns => ID)
    id: string

    authorId?: string | null

    @Field(returns => User)
    author?: User | null

    @Field(returns => Number)
    type?: number | null

    @Field(returns => String)
    owner?: string | null

    @Field(returns => Number)
    approve?: number
}