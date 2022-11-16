import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { TransactionResolver } from '../resolvers/transaction.resolver'

@Module({
  imports: [PrismaModule],
  providers: [TransactionResolver]
})
export class TransactionModule {}
