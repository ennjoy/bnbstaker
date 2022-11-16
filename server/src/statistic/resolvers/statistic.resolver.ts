import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, Query, Args } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { CurrentAdmin } from '../../admin/decorators/current-admin.decorator'
import { Admin } from '../../admin/models/admin.model'
import { Statistic } from '../models/statistic.model'

@UseGuards(GqlAuthGuard)
@Resolver()
export class StatisticResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    @Query(returns => Statistic)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async rechargedCount(
        @Args('token', { type: () => Number, nullable: true }) token: number,
        @Args('hours', { type: () => Number, nullable: true }) hours: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<Statistic | null> {

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

        const data = await this.prisma.transaction.aggregate({
            where: {
                token: token,
                status: true,
                createdAt: {
                    gte: hours ? new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000) : undefined,
                    lt: new Date()
                },
                author: {
                    ...where
                }
            },
            _count: {
                amount: true
            },
            _sum: {
                amount: true
            }
        })

        return {
            count: data._count.amount ?? 0,
            sum: data._sum.amount ?? 0
        }
    }

    @Query(returns => Statistic)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async replenishmentCount(
        @Args('token', { type: () => Number, nullable: true }) token: number,
        @Args('hours', { type: () => Number, nullable: true }) hours: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<Statistic | null> {

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

        const data = await this.prisma.transaction.aggregate({
            where: {
                token: token,
                status: true,
                createdAt: {
                    gte: hours ? new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000) : undefined,
                    lt: new Date()
                },
                author: {
                    ...where
                }
            },
            _count: {
                amount: true
            },
            _sum: {
                amount: true
            },
        })

        return {
            count: data._count.amount ?? 0,
            sum: data._sum.amount ?? 0
        }
    }

    @Query(returns => Statistic)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async withdrawalsCount(
        @Args('token', { type: () => Number, nullable: true }) token: number,
        @Args('hours', { type: () => Number, nullable: true }) hours: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<Statistic | null> {

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

        const data = await this.prisma.transaction.aggregate({
            where: {
                token: token,
                status: false,
                createdAt: {
                    gte: hours ? new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000) : undefined,
                    lt: new Date()
                },
                author: {
                    ...where
                }
            },
            _count: {
                amount: true
            },
            _sum: {
                amount: true
            },
        })

        return {
            count: data._count.amount ?? 0,
            sum: data._sum.amount ?? 0
        }
    }

    @Query(returns => Number)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async planCount(
        @Args('token', { type: () => Number, nullable: true }) token: number,
        @Args('plan', { type: () => Number, nullable: true, defaultValue: 0 }) plan: number,
        @Args('hours', { type: () => Number, nullable: true }) hours: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<number | null> {

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

        return this.prisma.transaction.count({
            where: {
                token: token,
                plan: plan,
                status: true,
                createdAt: {
                    gte: hours ? new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000) : undefined,
                    lt: new Date()
                },
                author: {
                    ...where
                }
            }
        })
    }
}
