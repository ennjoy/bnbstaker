import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { VisitResolver } from '../resolvers/visit.resolver'

@Module({
  imports: [PrismaModule],
  providers: [VisitResolver]
})
export class VisitModule {}
