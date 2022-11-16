import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Balance } from './balance.model'
import { Piw } from './piw.model'
import { Transaction } from '../../transaction/models/transaction.model'

@ObjectType()
export class User {
    @Field(returns => Date)
    createdAt: Date

    @Field(returns => ID)
    id: string
    
    @Field(returns => ID)
    companyId: string

    @Field(returns => String)
    owner: string | null

    @Field(returns => String)
    address: string | null

    @Field(returns => Boolean)
    active?: boolean

    @Field(returns => Boolean)
    withdraw?: boolean

    @Field(returns => Number)
    approve?: number

    @Field(returns => Balance, { nullable: true })
    balances?: Balance | null

    @Field(returns => Piw)
    plan?: Piw | null

    @Field(returns => Piw)
    invested?: Piw | null

    @Field(returns => Piw)
    withdrawn?: Piw | null

    @Field(returns => [Transaction], { nullable: true })
    transactions?: Transaction | null
}