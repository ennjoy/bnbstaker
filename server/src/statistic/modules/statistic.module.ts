import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { StatisticResolver } from '../resolvers/statistic.resolver'

@Module({
  imports: [PrismaModule],
  providers: [StatisticResolver]
})
export class StatisticModule {}
