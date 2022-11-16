import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Contract } from './contract.model'


@ObjectType()
export class Balance {
    @Field(returns => String)
    updatedAt: string

    @Field(returns => String, { nullable: true })
    address?: string

    @Field(returns => Number, { nullable: true })
    chainId?: number

    @Field(returns => String, { nullable: true })
    quoteCurrency?: string

    @Field(returns => [Contract], { nullable: true })
    items: Contract[] | null

}