import { UseGuards, Inject } from '@nestjs/common'
import { Resolver, Query, Args, ID } from '@nestjs/graphql'
import { CacheControl } from 'nestjs-gql-cache-control'
import { PrismaService } from '../../prisma/services/prisma.service'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { CurrentAdmin } from '../../admin/decorators/current-admin.decorator'
import { Admin } from '../../admin/models/admin.model'
import { User } from '../../user/models/user.model'

@UseGuards(GqlAuthGuard)
@Resolver(of => Admin)
export class InviteResolver {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    @Query(returns => [User])
    @CacheControl({ maxAge: 10, scope: 'PRIVATE' })
    async invites(
        @Args('query', { type: () => String, nullable: true }) query: string,
        @Args('owner', { type: () => ID, nullable: true }) owner: string,
        @Args('take', { type: () => Number, nullable: true, defaultValue: 10 }) take: number,
        @Args('skip', { type: () => Number, nullable: true, defaultValue: 0 }) skip: number,
        @CurrentAdmin() { id, address, role }: Admin
    ): Promise<User[] | null> {
        let where = {}

        if (owner) {
            where = {
                owner: owner
            }
        } else if (role == 'ROOT') {
            where = {
                owner: undefined
            }
        } else {
            where = {
                owner: address
            }
        }

        return this.prisma.user
            .findMany({
                where: {
                    ...where,
                    address: query || undefined,
                    active: true
                },
                take: take || undefined,
                skip: skip || undefined,
                orderBy: {    
                    updatedAt: 'desc'
                }
            })
    }

}
