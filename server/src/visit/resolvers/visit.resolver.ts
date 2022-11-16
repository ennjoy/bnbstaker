import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, Query, Args } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { UserContext } from '../../user/decorators/user-context.decorator'
import { Visit } from '../models/visit.model'

@Resolver()
export class VisitResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    @Query(returns => Visit)
    @CacheControl({ maxAge: 10 })
    async visit(@UserContext() { ip }): Promise<Visit | null> {
        return this.prisma.visit.upsert({
            where: { ip },
            update: { },
            create: { ip }
        })
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => Number)
    @CacheControl({ maxAge: 10 })
    async visitCount(
        @Args('hours', { type: () => Number, nullable: true }) hours: number
    ): Promise<number | null> {
        return this.prisma.visit.count({
            where: {
                createdAt: {
                    gte: hours ? new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000) : undefined,
                    lt: new Date()
                }
            }
        })
    }
}
