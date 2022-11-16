import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { MessageResolver } from '../resolvers/message.resolver'

@Module({
  imports: [PrismaModule],
  providers: [MessageResolver]
})
export class MessageModule {}
