import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, ResolveField, Query, Mutation, Parent, Args } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { CurrentAdmin } from '../../admin/decorators/current-admin.decorator'
import { Transaction } from '../models/transaction.model'
import { CreateTransactionInput } from '../inputs/create-transaction.input'
import { User } from '../../user/models/user.model'
import { Admin } from '../../admin/models/admin.model'

@Resolver(of => Transaction)
export class TransactionResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    @UseGuards(GqlAuthGuard)
    @Query(returns => [Transaction])
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async allTransactions(
        @Args('query', { type: () => String, nullable: true }) query: string,
        @Args('token', { type: () => Number, nullable: true }) token: number,
        @Args('hours', { type: () => Number, nullable: true }) hours: number,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<Transaction[] | null> {

        let where = {}

        if (role == 'ROOT') {
            where = {
                owner: undefined
            }
        } else if (role == 'SUDO') {

            const admin = await this.prisma.admin.findMany({
                where: {
                    owner: id
                },
                select: {
                    id: true
                }
            })

            const companyIds = admin.map(({ id }) => id)

            where = {
                companyId: {
                    in: [...companyIds, id]
                }
            }
        } else {
            where = {
                companyId: id
            }
        }

        return this.prisma.transaction.findMany({
            where: {
                token: token,
                createdAt: {
                    gte: hours ? new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000) : undefined,
                    lt: new Date()
                },
                author: {
                    ...where,
                    address: query ? query.toLowerCase() : undefined,
                    active: true
                }
            },
            take: take,
            skip: skip,
            orderBy: {    
                id: 'desc'
            }
        })
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => [Transaction])
    @CacheControl({ maxAge: 10 })
    transactions(
        @Args('address', { type: () => String }) address: string,
        @Args('token', { type: () => Number, nullable: true }) token: number,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number
    ): Promise<Transaction[] | null> {
        return this.prisma.transaction.findMany({
            where: {
                author: {
                    address: address.toLowerCase()
                },
                token: token,
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
        return this.prisma.transaction
            .findUnique({
                where: { id },
            })
            .author({})
    }

    @Mutation(returns => Transaction)
    createTransaction(@Args('input') input: CreateTransactionInput): Promise<Transaction | null> {
        return this.prisma.transaction.create({
            data: {
                amount: input.amount,
                status: input.status,
                token: input.token,
                plan: input.plan,
                author: {
                    connect: {
                        address: input.address.toLowerCase()
                    }
                }
            }
        })
    }
}
