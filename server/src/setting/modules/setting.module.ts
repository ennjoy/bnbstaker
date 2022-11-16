import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { SettingResolver } from '../resolvers/setting.resolver'

@Module({
  imports: [PrismaModule],
  providers: [SettingResolver]
})
export class SettingModule {}
