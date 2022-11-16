import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Statistic {
    @Field(returns => Number, { nullable: true })
    count: number | null

    @Field(returns => Number, { nullable: true })
    sum: number | null
}