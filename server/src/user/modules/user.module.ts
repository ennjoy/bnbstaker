import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { DatasourceModule } from 'src/datasource/modules/datasource.module'
import { UserResolver } from '../resolvers/user.resolver'

@Module({
  imports: [
    PrismaModule,
    DatasourceModule
  ],
  providers: [UserResolver]
})
export class UserModule {}
