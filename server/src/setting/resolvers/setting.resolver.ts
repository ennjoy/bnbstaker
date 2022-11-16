import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { Setting } from '../models/setting.model'

@UseGuards(GqlAuthGuard)
@Resolver()
export class SettingResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    @Query(returns => Setting)
    @CacheControl({ maxAge: 10 })
    async autoResponder(): Promise<Setting | null> {
        return this.prisma.settings.findUnique({
            where: {
                key: 'autoresponder'
            }
        })
    }

    @Mutation(returns => Setting)
    async changeActiveAutoResponder(): Promise<Setting | null> {

        const autoResponder = await this.prisma.settings.findUnique({
            where: {
                key: 'autoresponder'
            }
        })

        return this.prisma.settings.update({
            where: {
                id: autoResponder.id
            },
            data: {
                active: !autoResponder.active
            }
        })
        
    }

    @Mutation(returns => Setting)
    createAutoResponder(
        @Args('value', { type: () => String }) value: string,
    ): Promise<Setting | null> {

        return this.prisma.settings.upsert({
            where: {
                key: 'autoresponder'
            },
            update: {
                value: value,
                active: true
            },
            create: {
                key: 'autoresponder',
                value: value
            }
            
        })
        
    }
}
