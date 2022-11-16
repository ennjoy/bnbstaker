import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { ClientResolver } from '../resolvers/client.resolver'

@Module({
  imports: [PrismaModule],
  providers: [ClientResolver]
})
export class ClientModule {}
