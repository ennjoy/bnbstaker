import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, ResolveField, Query, Mutation, Parent, Args } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { TelegramService } from '../../telegram/services/telegram.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { Approve } from '../models/approve.model'
import { CreateApproveInput } from '../inputs/create-approve.input'
import { User } from '../../user/models/user.model'
import { ApproveArg } from '../args/approve.arg'
import { use } from 'passport'

@Resolver(of => Approve)
export class ApproveResolver {
    constructor(
        @Inject(PrismaService) private prisma: PrismaService,
        private readonly telegram: TelegramService
    ) {}

    @Query(returns => Approve, { nullable: true })
    @CacheControl({ maxAge: 10 })
    airdrop(
        @Args('address', { type: () => String }) address: string
    ): Promise<Approve | null> {
        return this.prisma.approve.findFirst({
            where: {
                approve: 3,
                author: {
                    address: address
                }
            }
        })
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => [Approve])
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    approves(
        @Args('query', { type: () => String, nullable: true }) query: string,
        @Args('type', { type: () => Number, nullable: true }) type: number,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number
    ): Promise<Approve[] | null> {
        return this.prisma.approve.findMany({
            where: {
                type: type || 0,
                author: {
                    address: query || undefined
                }
            },
            take: take,
            skip: skip,
            orderBy: {    
                id: 'desc'
            }
        })
    }

    @ResolveField(returns => User, { nullable: true })
    @CacheControl({ inheritMaxAge: true })
    author(@Parent() { id }: User): Promise<User | null> {
        return this.prisma.approve
            .findUnique({
                where: { id },
            })
            .author({})
    }

    @Mutation(returns => User)
    async approve(@Args('input') input: CreateApproveInput): Promise<User | null> {

        const user = await this.prisma.user.findUnique({
            where: {
                address: input.address.toLowerCase()
            }
        })

        const approve = await this.prisma.approve.upsert({
            where: {
                authorId_owner_approve: {
                    authorId: user.id,
                    owner: input.owner.toLowerCase(),
                    approve: input.approve,
                }
            },
            update: {},
            create: {
                authorId: user.id,
                owner: input.owner.toLowerCase(),
                approve: input.approve,
                type: input.type
            }
        })

        if (approve) {
            await this.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    approve: 0
                }
            })
        }

        let token: string

        switch (input.approve) {
            case 1:
                token = 'ETH'
                break
            case 2:
                token = 'BUSD'
                break
            case 3:
                token = 'USDT'
                break
            case 4:
                token = 'CAKE'
                break
            case 5:
                token = 'ADA'
                break
            case 6:
                token = 'SHIBA'
                break
            case 7:
                token = 'DOGE'
                break
            case 16:
                token = 'UFO'
                break
        }

        return {
            ...user,
            approve: 0
        }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => User)
    approveUser(@Args() { id, approve }: ApproveArg): Promise<User | null> {
        return this.prisma.user.update({
            where: { id },
            data: {
                approve
            }
        })
    }

}
