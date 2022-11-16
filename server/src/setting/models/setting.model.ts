import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Setting {
    @Field(returns => ID)
    id: string
    
    @Field(returns => Boolean)
    active?: boolean | null

    @Field(returns => String, { nullable: true })
    value?: string | null
}