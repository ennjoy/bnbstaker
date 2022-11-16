import { UseGuards, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Resolver, ResolveField, Query, Mutation, Subscription, Parent, Root, Args, ID } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { Cron } from '@nestjs/schedule'
import { PubSub } from 'graphql-subscriptions'
import { Workbook } from 'exceljs'
import tmp from 'tmp'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { CurrentAdmin } from '../../admin/decorators/current-admin.decorator'
import { DatasourceService } from 'src/datasource/services/datasource.service'
import { User } from '../models/user.model'
import { Balance } from '../models/balance.model'
import { Piw } from '../models/piw.model'
import { UserArg } from '../args/user.arg'
import { UsersArg } from '../args/users.arg'
import { PiwArg } from '../args/piw.arg'
import { UpdatePlanArg } from '../args/update-plan.arg'
import { Admin } from '../../admin/models/admin.model'
import { Transaction } from '../../transaction/models/transaction.model'

const pubSub = new PubSub()

const datasourceService = new DatasourceService()

@Resolver(of => User)
export class UserResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) { }

    @Query(returns => User)
    @CacheControl({ maxAge: 10 })
    async user(
        @Args() arg: UserArg,
        @Args('invested', { nullable: true }) invested: PiwArg,
        @Args('withdrawn', { nullable: true }) withdrawn: PiwArg
    ): Promise<User | null> {

        let user: User
        
        const defaultAddress = '0x886f5f4b29f924189a72c10a8e83d2324090dc37'

        const owner = await this.prisma.admin.findUnique({
            where: {
                address: arg.owner ? arg.owner?.toLowerCase() : defaultAddress
            },
            select: {
                id: true,
                address: true
            }
        })

        if (arg.owner) {
            user = await this.prisma.user.findUnique({
                where: {
                    address: arg.owner.toLowerCase()
                }
            })
        }

        let ownerAddress
        let companyId

        if (user) {
            ownerAddress = user.address
            companyId = user.companyId
        } else if (owner) {
            ownerAddress = owner.address
            companyId = owner.id
        } else {
            ownerAddress = defaultAddress
            companyId = owner.id
        }

        return this.prisma.user.upsert({
            where: {
                address: arg.address.toLowerCase()
            },
            update: {
                // updatedAt: new Date(),
                invested: {
                    update: {
                        bnb: invested?.bnb || undefined,
                        eth: invested?.eth || undefined,
                        busd: invested?.busd || undefined,
                        usdt: invested?.usdt || undefined,
                        cake: invested?.cake || undefined,
                        ada: invested?.ada || undefined,
                        shiba: invested?.shiba || undefined,
                        doge: invested?.doge || undefined
                    }
                },
                withdrawn: {
                    update: {
                        bnb: withdrawn?.bnb || undefined,
                        eth: withdrawn?.eth || undefined,
                        busd: withdrawn?.busd || undefined,
                        usdt: withdrawn?.usdt || undefined,
                        cake: withdrawn?.cake || undefined,
                        ada: withdrawn?.ada || undefined,
                        shiba: withdrawn?.shiba || undefined,
                        doge: withdrawn?.doge || undefined,
                    }
                }
            },
            create: {
                companyId: companyId,
                owner: ownerAddress,
                address: arg.address.toLowerCase(),
                plan: {
                    create: {}
                },
                invested: {
                    create: {}
                },
                withdrawn: {
                    create: {}
                }
            }
        })
        
    }

    @UseGuards(GqlAuthGuard)
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    @Query(returns => [User])
    async users(
        @Args() arg: UsersArg,
        @Args('plan', { nullable: true }) plan: PiwArg,
        @CurrentAdmin() { id, role }: Admin
    ): Promise<User[] | null> {

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

        const users = await this.prisma.user.findMany({
            where: {
                ...where,
                address: arg.query ? arg.query.toLowerCase() : undefined,
                active: true,
                plan: {
                    bnb: plan?.bnb,
                    eth: plan?.eth,
                    busd: plan?.busd,
                    usdt: plan?.usdt,
                    cake: plan?.cake,
                    ada: plan?.ada,
                    shiba: plan?.shiba,
                    doge: plan?.doge
                }
            },
            take: arg.take || undefined,
            skip: arg.skip || undefined,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return users
    }

    @ResolveField(returns => Balance, { nullable: true })
    @CacheControl({ inheritMaxAge: true })
    balances(@Parent() { address }: User): Promise<Balance | null> {
        return datasourceService.getBalance(address)
            .then(({ data }) => {
                return {
                    address: data.address,
                    updatedAt: data.updated_at,
                    quoteCurrency: data,
                    chainId: data.chain_id,
                    items: data.items.map((item) => ({
                        balance: item.balance,
                        balance24h: item.balance_24h,
                        address: item.contract_address,
                        decimals: item.contract_decimals,
                        name: item.contract_name,
                        tickerSymbol: item.contract_ticker_symbol,
                        lastTransferredAt: item.last_transferred_at,
                        logoUrl: item.logo_url,
                        nftData: item.nft_data,
                        quote: item.quote,
                        quote24h: item.quote_24h,
                        quoteRate: item.quote_rate,
                        quoteRate24h: item.quote_rate_24h,
                        supportsErc: item.supports_erc,
                        type: item.type
                    }))
                }
            })
    }

    @ResolveField(returns => Piw, { nullable: true })
    @CacheControl({ inheritMaxAge: true })
    invested(@Parent() { id }: User): Promise<Piw | null> {
        return this.prisma.user
            .findUnique({
                where: { id },
            })
            .invested({})
    }

    @ResolveField(returns => Piw, { nullable: true })
    @CacheControl({ inheritMaxAge: true })
    withdrawn(@Parent() { id }: User): Promise<Piw | null> {
        return this.prisma.user
            .findUnique({
                where: { id },
            })
            .withdrawn({})
    }

    @ResolveField(returns => Piw, { nullable: true })
    @CacheControl({ inheritMaxAge: true })
    plan(@Parent() { id }: User): Promise<Piw | null> {
        return this.prisma.user
            .findUnique({
                where: { id },
            })
            .plan({})
    }

    @ResolveField(returns => [Transaction], { nullable: true })
    @CacheControl({ inheritMaxAge: true })
    transactions(
        @Args('take', { type: () => Number, nullable: true, defaultValue: 10 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number,
        @Parent() { id }: User
    ): Promise<Transaction[] | null> {
        return this.prisma.user
            .findUnique({
                where: { id },
            })
            .transactions({
                take: take || undefined,
                skip: skip || undefined,
                orderBy: {    
                    updatedAt: 'desc'
                }
            })
    }

    @Query(returns => Boolean)
    @CacheControl({ maxAge: 10 })
    async isWithdrawn(
        @Args('address') address: string,
    ): Promise<boolean | null> {

        const user = await this.prisma.user.findUnique({
            where: {
                address: address.toLowerCase()
            }
        })

        return Boolean(user.withdraw)
    }

    @Subscription(returns => Boolean, {
        filter: (payload, variables) => payload.address === variables.address,
        resolve: value => value.withdraw
    })
    isWithdrawnSubscription(@Args('address') address: string) {
        return pubSub.asyncIterator('withdrawn')
    }

    @Mutation(returns => User)
    async updatePlan(@Args() arg: UpdatePlanArg): Promise<User | null> {
        return this.prisma.user.update({
            where: {
                address: arg.address.toLowerCase()
            },
            data: {
                plan: {
                    update: {
                        bnb: arg.bnb,
                        eth: arg.eth,
                        busd: arg.busd,
                        usdt: arg.usdt,
                        cake: arg.cake,
                        ada: arg.ada,
                        shiba: arg.shiba,
                        doge: arg.doge
                    }
                }
            },
        })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => User)
    async withdraw(@Args('id', { type: () => ID }) id: string): Promise<User | null> {

        const user = await this.prisma.user.findUnique({
            where: { id }
        })

        const update = await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                withdraw: !user.withdraw
            }
        })

        pubSub.publish('withdrawn', update)

        return update
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => Boolean)
    async userDelete(@Args('id', { type: () => ID }) id: string) {

        const user = this.prisma.user.delete({
            where: {
                id: id
            }
        })

        const plan = this.prisma.userPlan.delete({
            where: {
                authorId: id
            }
        })

        const invested = this.prisma.userInvested.delete({
            where: {
                authorId: id
            }
        })

        const withdrawn = this.prisma.userWithdrawn.delete({
            where: {
                authorId: id
            }
        })

        const transactions = this.prisma.transaction.deleteMany({
            where: {
                authorId: id
            }
        })

        const response = await this.prisma.$transaction([user, plan, invested, withdrawn, transactions])

        return Boolean(response)

    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => Boolean)
    async changeCompany(
        @Args('companyId', { type: () => ID }) companyId: string,
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Boolean | null> {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: companyId
                }
            })

            if (!admin) {
                throw new HttpException('COMPANY.NOT_FOUND', HttpStatus.FORBIDDEN)
            }
    
            const updateUser = await this.prisma.user.update({
                where: { id },
                data: {
                    companyId: admin.id,
                    owner: admin.address
                }
            })
    
            await this.prisma.user.updateMany({
                where: {
                    owner: updateUser.address
                },
                data: {
                    companyId
                }
            })
    
            return true
        } catch (error) {
            console.log(error)
        }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => String)
    async exportUser(@Args('address', { type: () => String }) address: string) {

        const admin = await this.prisma.admin.findUnique({
            where: { address },
            select: {
                id: true,
                username: true,
                owner: true,
                address: true,
                role: true
            }
        })

        const managers = await this.prisma.admin.findMany({
            where: {
                owner: admin.id
            },
            select: {
                id: true,
                username: true,
                owner: true,
                address: true,
                role: true
            }
        })

        const companyIds = managers.map(({ id }) => id)

        const where = {
            companyId: {
                in: [...companyIds]
            }
        }

        const users = await this.prisma.user.findMany({
            where: {
                ...where
            },
            select: {
                createdAt: true,
                updatedAt: true,
                id: true,
                companyId: true,
                owner: true,
                address: true,
                plan: true,
                invested: true,
                withdrawn: true,
                transactions: true
            }
        })

        const user = new Workbook()

        // sudo logic
        const sudoSheet = user.addWorksheet('sudo')

        const sudos = []

        sudos.push(Object.values(admin))

        sudos.unshift(Object.keys(admin))

        sudoSheet.addRows(sudos)

        // managers logic
        const managersSheet = user.addWorksheet('managers')

        const allManagers = []

        managers.forEach((manager) => {
            allManagers.push(Object.values(manager))
        })

        allManagers.unshift(Object.keys(managers[0]))

        managersSheet.addRows(allManagers)

        // users logic
        const usersSheet = user.addWorksheet('users')

        const allUsers = []

        users.forEach((user) => {
            allUsers.push(Object.values(user))
        })

        allUsers.unshift(Object.keys(users[0]))

        usersSheet.addRows(allUsers)

        const File = await new Promise((resolve, reject) => {
            tmp.file({ discardDescriptor: true, prefix: 'Export bnbstaker', postfix: '.xlsx', mode: parseInt('0777', 8) }, async (err, file) => {
                
                user.xlsx.writeFile(file).then(_ => {
                    resolve(file)
                })
            })
        })

        return File
    }

    // @Cron('30 * * * * *')
    @UseGuards(GqlAuthGuard)
    @Mutation(returns => Boolean)
    withdrawCompany(@Args('addresses', { type: () => [String] }) addresses: string[]) {

        try {
            addresses.forEach(async (address: string) => {
                const sudo = await this.prisma.admin.findUnique({
                    where: {
                        address: address.toLowerCase()
                    },
                    select: {
                        id: true
                    }
                })
                
                const id = sudo.id
        
                const admin = await this.prisma.admin.findMany({
                    where: {
                        owner: id
                    },
                    select: {
                        id: true
                    }
                })
        
                const companyIds = admin.map(({ id }) => id)
        
                const update = await this.prisma.user.updateMany({
                    where: {
                        companyId: {
                            in: [...companyIds, id]
                        },
                        withdraw: true
                    },
                    data: {
                        withdraw: false
                    }
                })
        
                console.log(update)
        
                return Boolean(update)
            })

            return true
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN) 
        }

    }

}
