import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsEthereumAddress } from 'class-validator'

@InputType()
export class CreateApproveInput {
    @IsNumber()
    @Field(returns => Number)
    approve: number

    @IsEthereumAddress()
    @Field(returns => String)
    owner: string

    @IsEthereumAddress()
    @Field(returns => String)
    address: string

    @Field(returns => Number, { defaultValue: 0 })
    type: number
}