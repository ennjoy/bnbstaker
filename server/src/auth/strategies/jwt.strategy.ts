import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    })
  }

  async validate(payload: { sub: string, username: string, password: string, address: string, role: string }) {

    const user = await this.authService.validateCredentials(payload.username, payload.password)
    
    if (!user) {
      throw new UnauthorizedException()
    }

    return {
      id: payload.sub,
      username: payload.username,
      password: payload.password,
      address: payload.address,
      role: payload.role
    }
  }
}