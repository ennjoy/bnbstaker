import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, ResolveField, Parent, Query, Args, ID } from '@nestjs/graphql'
import { PrismaService } from '../../prisma/services/prisma.service'
import { CacheControl } from 'nestjs-gql-cache-control'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { Message } from '../../message/models/message.model'
import { Client } from '../models/client.model'

@UseGuards(GqlAuthGuard)
@Resolver(of => Client)
export class ClientResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) { }

    @Query(returns => Client, { nullable: true })
    @CacheControl({ maxAge: 10 })
    async client(
        @Args('id', { type: () => ID }) id: string
    ): Promise<Client | null> {
        return this.prisma.client.findUnique({
            where: { id }
        })
    }

    @Query(returns => [Client], { nullable: true })
    @CacheControl({ maxAge: 10 })
    async clients(
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true }) skip: number,
    ): Promise<Client[] | null> {
        return this.prisma.client.findMany({
            take: take || undefined,
            skip: skip || undefined,
            orderBy: {
                updatedAt: 'desc'
            }
        })
    }

    @ResolveField()
    @CacheControl({ inheritMaxAge: true })
    messages(
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true }) skip: number,
        @Parent() { id }: Client
    ): Promise<Message[] | null> {
        return this.prisma.client
            .findUnique({
                where: { id }
            })
            .messages({
                take: take || undefined,
                skip: skip || undefined,
                orderBy: {
                    createdAt: 'desc'
                }
            })
    }

}