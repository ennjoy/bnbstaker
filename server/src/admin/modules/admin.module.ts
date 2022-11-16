import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { AdminResolver } from '../resolvers/admin.resolver'

@Module({
  imports: [PrismaModule],
  providers: [AdminResolver],
})
export class AdminModule {}