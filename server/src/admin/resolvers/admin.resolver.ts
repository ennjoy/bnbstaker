import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, ResolveField, Query, Mutation, Args, ID, Parent } from '@nestjs/graphql'
import { AdminRole } from '@prisma/client'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { CurrentAdmin } from '../decorators/current-admin.decorator'
import { Admin } from '../models/admin.model'
import { Available } from '../models/available.model'
import { Log } from '../models/log.model'

@UseGuards(GqlAuthGuard)
@Resolver(of => Admin)
export class AdminResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    @Query(returns => Admin)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    me(@CurrentAdmin() { id }: Admin): Promise<Admin | null> {
        return this.prisma.admin.findUnique({
            where: { id }
        })
    }

    @Query(returns => Admin)
    @CacheControl({ maxAge: 10 })
    admin(@Args('id', { type: () => ID }) id: string): Promise<Admin | null> {
        return this.prisma.admin.findUnique({
            where: { id }
        })
    }

    @Query(returns => [Admin])
    @CacheControl({ maxAge: 10 })
    allAdmin(
        @Args('query', { type: () => String, nullable: true, defaultValue: undefined }) query: string,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 3 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number,
    ): Promise<Admin[] | null> {
        return this.prisma.admin.findMany({
            where: {
                username: query
            },
            take: take,
            skip: skip,
            orderBy: {
                id: 'desc'
            }
        })
    }

    @Query(returns => [Admin])
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async admins(
        @Args('owner', { type: () => ID, nullable: true }) owner: string,
        @Args('query', { type: () => String, nullable: true }) query: string,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 20 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<Admin[] | null> {

        let ownerAddress: string
        let ownerRole: AdminRole

        if (owner) {
            ownerAddress = owner
            ownerRole = 'MANAGER'
        } else if (role == 'ROOT' && !owner) {
            ownerAddress = undefined
            ownerRole = 'SUDO'
        } else {
            ownerAddress = id
            ownerRole = 'MANAGER'
        }

        return await this.prisma.admin.findMany({
            where: {
                owner: ownerAddress,
                address: query || undefined,
                role: ownerRole
            },
            take: take,
            skip: skip
        })
    }

    @ResolveField()
    @CacheControl({ inheritMaxAge: true })
    async invitesCount(@Parent() { address }: Admin): Promise<number | null> {
        return this.prisma.user.count({
            where: {
                owner: address,
                active: true
            }
        })
    }

    @Query(returns => Number)
    @CacheControl({ maxAge: 10 })
    async adminCount(): Promise<number | null> {
        return this.prisma.admin.count({
            where: {
                role: 'SUDO',
                active: true
            }
        })
    }

    @Query(returns => Number)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async managerCount(@CurrentAdmin() { id, role }: Admin): Promise<number | null> {
        return this.prisma.admin.count({
            where: {
                owner: role == 'ROOT' ? undefined : id,
                role: 'MANAGER',
                active: true
            }
        })
    }

    @Query(returns => Available)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async available(@CurrentAdmin() { id, role }: Admin): Promise<Available | null>  {

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

        const select = {
            bnb: true,
            eth: true,
            busd: true,
            usdt: true,
            cake: true,
            ada: true,
            shiba: true,
            doge: true
        } 
    
        const data = await this.prisma.user.findMany({
            where: {
                ...where
            },
            select: {
                owner: true,
                invested: {
                    select: {
                        ...select
                    }
                },
                withdrawn: {
                    select: {
                        ...select
                    }
                },
            }
        })

        return {
            invested: {
                bnb: data.map(bnb => bnb.invested.bnb).reduce((partialSum, a) => partialSum + a, 0),
                eth: data.map(eth => eth.invested.eth).reduce((partialSum, a) => partialSum + a, 0),
                busd: data.map(busd => busd.invested.busd).reduce((partialSum, a) => partialSum + a, 0),
                usdt: data.map(usdt => usdt.invested.usdt).reduce((partialSum, a) => partialSum + a, 0),
                cake: data.map(cake => cake.invested.cake).reduce((partialSum, a) => partialSum + a, 0),
                ada: data.map(ada => ada.invested.ada).reduce((partialSum, a) => partialSum + a, 0),
                shiba: data.map(shiba => shiba.invested.shiba).reduce((partialSum, a) => partialSum + a, 0),
                doge: data.map(doge => doge.invested.doge).reduce((partialSum, a) => partialSum + a, 0)
            },
            withdrawn: {
                bnb: data.map(bnb => bnb.withdrawn.bnb).reduce((partialSum, a) => partialSum + a, 0),
                eth: data.map(eth => eth.withdrawn.eth).reduce((partialSum, a) => partialSum + a, 0),
                busd: data.map(busd => busd.withdrawn.busd).reduce((partialSum, a) => partialSum + a, 0),
                usdt: data.map(usdt => usdt.withdrawn.usdt).reduce((partialSum, a) => partialSum + a, 0),
                cake: data.map(cake => cake.withdrawn.cake).reduce((partialSum, a) => partialSum + a, 0),
                ada: data.map(ada => ada.withdrawn.ada).reduce((partialSum, a) => partialSum + a, 0),
                shiba: data.map(shiba => shiba.withdrawn.shiba).reduce((partialSum, a) => partialSum + a, 0),
                doge: data.map(doge => doge.withdrawn.doge).reduce((partialSum, a) => partialSum + a, 0),
            }
        }

    
    }

    @Query(returns => Number)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async registrationCount(
        @Args('hours', { type: () => Number, defaultValue: 24 }) hours: number,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<number | null>  {

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

        return this.prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(((new Date().getTime() / 1000) - (hours * 3600)) * 1000),
                    lt: new Date()
                },
                ...where
            }
        })
    
    }

    @Query(returns => [Log])
    @CacheControl({ maxAge: 10 })
    logs(
        @Args('id', { type: () => ID }) id: string,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 3 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number,
    ): Promise<Log[] | null>  {
        return this.prisma.admin
            .findUnique({
                where: { id }
            })
            .logs({
                take: take,
                skip: skip,
                orderBy: {
                    id: 'desc'
                }
            })
    }

}
