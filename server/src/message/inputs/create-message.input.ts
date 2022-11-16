import { Field, InputType } from '@nestjs/graphql'
import { IsString, Length } from 'class-validator'

@InputType()
export class CreateMessageInput {
    @Field(returns => String, { nullable: true })
    id: string

    @IsString()
    @Length(0, 512)
    @Field(returns => String)
    content: string
}