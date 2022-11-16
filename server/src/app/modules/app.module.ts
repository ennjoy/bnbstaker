import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import Redis from 'ioredis'
import { BaseRedisCache } from 'apollo-server-cache-redis'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { DatasourceModule } from '../../datasource/modules/datasource.module'
import { TelegramModule } from '../../telegram/modules/telegram.module'
import { AuthModule } from '../../auth/modules/auth.module'
import { AdminModule } from '../../admin/modules/admin.module'
import { InviteModule } from '../../invite/modules/invite.module'
import { UserModule } from '../../user/modules/user.module'
import { StatisticModule } from '../../statistic/modules/statistic.module'
import { VisitModule } from '../../visit/modules/visit.module'
import { TransactionModule } from '../../transaction/modules/transaction.module'
import { ApproveModule } from '../../approve/modules/approve.module'
import { SettingModule } from '../../setting/modules/setting.module'
import { ClientModule } from '../../client/modules/client.module'
import { MessageModule } from '../../message/modules/message.module'

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      playground: true,
      plugins: [
        responseCachePlugin({
          sessionId: (requestContext) => (requestContext.request.http.headers.get('session-id') || null)
        })
      ],
      cache: new BaseRedisCache({
        client: new Redis({
          host: 'localhost',
          port: 6379
        })
      }),
    }),
    PrismaModule,
    DatasourceModule,
    TelegramModule,
    AuthModule,
    AdminModule,
    InviteModule,
    UserModule,
    StatisticModule,
    VisitModule,
    TransactionModule,
    ApproveModule,
    SettingModule,
    ClientModule,
    MessageModule
  ]
})
export class AppModule {}
