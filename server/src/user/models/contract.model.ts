import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Contract {
    @Field(returns => String, { nullable: true })
    balance: string | null

    @Field(returns => String, { nullable: true })
    balance24h?: string | null

    @Field(returns => String, { nullable: true })
    address?: string | null

    @Field(returns => Number, { nullable: true })
    decimals?: number | null

    @Field(returns => String, { nullable: true })
    name?: string | null

    @Field(returns => String, { nullable: true })
    tickerSymbol?: string | null
    
    @Field(returns => String, { nullable: true })
    lastTransferredAt?: string | null

    @Field(returns => String, { nullable: true })
    logoUrl?: string | null

    @Field(returns => String, { nullable: true })
    nftData?: string | null

    @Field(returns => Number, { nullable: true })
    quote?: number | null

    @Field(returns => Number, { nullable: true })
    quote24h?: number | null

    @Field(returns => Number, { nullable: true })
    quoteRate?: number | null

    @Field(returns => Number, { nullable: true })
    quoteRate24h?: number | null

    @Field(returns => [String], { nullable: true })
    supportsErc?: string[] | null

    @Field(returns => String, { nullable: true })
    type?: string | null

}