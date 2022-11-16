import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from '../../user/models/user.model'

@ObjectType()
export class Transaction {
    @Field(returns => Date)
    createdAt: Date

    @Field(returns => ID)
    id: string

    @Field(returns => Number)
    amount?: number | null

    @Field(returns => Boolean)
    status?: boolean | null

    @Field(returns => Number)
    token?: number | null

    @Field(returns => Number, { nullable: true })
    plan?: number | null

    authorId?: string | null

    @Field(returns => User)
    author?: User | null

}