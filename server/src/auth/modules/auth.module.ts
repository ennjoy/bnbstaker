import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../strategies/jwt.strategy'
import { LocalStrategy } from '../strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from '../../prisma/modules/prisma.module'
import { AuthResolver } from '../resolvers/auth.resolver'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { AdminModule } from '../../admin/modules/admin.module'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRESIN
      },
    }),
    PrismaModule,
    AdminModule,
    PassportModule,
  ],
  providers: [JwtStrategy, LocalStrategy, AuthResolver, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
