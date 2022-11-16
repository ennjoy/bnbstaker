import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, ResolveField, Parent, Query, Mutation, Subscription, Args, ID } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PubSub } from 'graphql-subscriptions'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { UserContext } from '../../user/decorators/user-context.decorator'
import { Message } from '../models/message.model'
import { CreateMessageInput } from '../inputs/create-message.input'
import { Client } from '../../client/models/client.model'

const pubSub = new PubSub()

@Resolver(of => Message)
export class MessageResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) { }

    @Query(returns => [Message], { nullable: true })
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    messages(
        @Args('id', { type: () => ID, nullable: true }) id: string,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true }) skip: number,
        @UserContext() { ip }
    ): Promise<Message[] | null> {

        const where = id ? {
            id: id
        } : {
            ip: ip
        }

        return this.prisma.client
            .findUnique({
                where: {
                    ...where
                }
            })
            .messages({
                take: take || undefined,
                skip: skip || undefined,
                orderBy: {
                    createdAt: 'asc'
                }
            })
    }

    @ResolveField()
    @CacheControl({ inheritMaxAge: true })
    client(@Parent() { id }: Message): Promise<Client | null> {
        return this.prisma.message
            .findUnique({
                where: { id }
            })
            .client()
    }

    @Subscription(returns => Message, {
        filter: (payload, variables) => {
            return variables.id ? payload.clientId === variables.id : payload.ip === variables.ip
        },
        resolve: value => value
    })
    messageAdded(@Args('id', { type: () => ID, nullable: true }) id: string) {
        return pubSub.asyncIterator('message')
    }

    @Subscription(returns => Message, {
        filter: (payload) => {
            return payload.senderId != null
        },
        resolve: value => value
    })
    messageNotify() {
        return pubSub.asyncIterator('message')
    }

    @Mutation(returns => Message)
    async createMessage(
        @Args('input') input: CreateMessageInput,
        @UserContext() { ip }
    ): Promise<Message | null> {

        const where = input.id ? {
            id: input.id
        } : {
            ip: ip
        }

        const findMessage = await this.prisma.message.findFirst({
            where: {
                client: {
                    ...where
                }
            },
            select: {
                client: true
            }
        })

        let clientId

        if (findMessage) {
            clientId = findMessage.client.id
            
            await this.prisma.client.update({
                where: {
                    id: clientId
                },
                data: {
                    updatedAt: new Date()
                }
            })
        } else {
            const createClient = await this.prisma.client.create({
                data: { ip }
            })

            clientId = createClient.id
        }

        const message = await this.prisma.message.create({
            data: {
                senderId: input.id ? undefined : clientId,
                content: input.content,
                client: {
                    connect: {
                        id: clientId,
                    }
                }
            }
        })

        const messageCount = await this.prisma.message.count({
            where: {
                clientId: clientId
            }
        })

        const autoResponder = await this.prisma.settings.findUnique({
            where: {
                key: 'autoresponder'
            }
        })

        if (messageCount == 1 && autoResponder.active && autoResponder.value) {
            await this.prisma.message.create({
                data: {
                    senderId: undefined,
                    clientId: clientId,
                    content: autoResponder.value
                }
            })
        }

        pubSub.publish('message', message)

        return message
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => Message)
    deleteMessage(@Args('id', { type: () => ID }) id: string): Promise<Message | null> {
        return this.prisma.message.delete({
            where: { id }
        })
    }
}