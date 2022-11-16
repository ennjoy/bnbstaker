import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { InviteResolver } from '../resolvers/invite.resolver'

@Module({
  imports: [PrismaModule],
  providers: [InviteResolver]
})
export class InviteModule {}
