import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsBoolean, IsEthereumAddress } from 'class-validator'

@InputType()
export class CreateTransactionInput {
    @IsNumber()
    @Field(returns => Number)
    amount: number

    @IsBoolean()
    @Field(returns => Boolean)
    status: boolean

    @IsNumber()
    @Field(returns => Number)
    token: number

    @IsNumber()
    @Field(returns => Number)
    plan: number

    @IsEthereumAddress()
    @Field(returns => String)
    address: string
}