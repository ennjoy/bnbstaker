import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { TelegramModule } from '../../telegram/modules/telegram.module'
import { ApproveResolver } from '../resolvers/approve.resolver'

@Module({
  imports: [
    PrismaModule,
    TelegramModule
  ],
  providers: [ApproveResolver]
})
export class ApproveModule {}
