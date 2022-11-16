import { Injectable, Inject, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma/services/prisma.service'
import { LoginInput } from '../inputs/login.input'
import { SignupInput } from '../inputs/signup.input'
import { Auth } from '../models/auth.model'

@Injectable()
export class AuthService {
    constructor(
        @Inject(PrismaService) private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(input: LoginInput, context?: any): Promise<Auth | any> {
        const credentials = await this.validateCredentials(input.username, input.password)

        if (!credentials) {
            return new UnauthorizedException()
        }

        await this.prisma.log.create({
            data: {
                adminId: credentials.id,
                ip: context.ip,
                agent: context.headers['user-agent']
            }
        })

        return this.generateTokens({
            sub: credentials.id,
            username: credentials.username,
            password: input.password,
            address: credentials.address,
            role: credentials.role
        })
    }

    async signup(input: SignupInput): Promise<Auth> {

        const username = await this.prisma.admin.findUnique({
            where: {
                username: input.username
            }
        })

        if (username) {
            throw new HttpException('username is taken', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const address = await this.prisma.admin.findUnique({
            where: {
                address: input.address.toLowerCase()
            }
        })

        if (address) {
            throw new HttpException('address is taken', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const password = input.password

        input.password = await bcrypt.hash(input.password, 10).then((r) => r)

        input.address = await input.address.toLowerCase()
        
        const create = await this.prisma.admin.create({
            data: input
        })

        const user = await this.prisma.user.findUnique({
            where: {
                address: create.address
            }
        })

        if (user) {
            await this.prisma.user.update({
                where: {
                    address: user.address
                },
                data: {
                    owner: create.address,
                    companyId: create.id
                }
            })
        }

        return this.generateTokens({
            sub: create.id,
            username: create.username,
            password: password,
            address: create.address,
            role: create.role
        })
    }

    async refreshToken(token: string) {
        try {
            const { sub, username, password, address, role } = this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_SECRET,
            })

            return this.generateTokens({ sub, username, password, address, role })
        } catch (e) {
            throw new UnauthorizedException()
        }
    }

    async verifyToken(token: string) {
        try {
            await this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_SECRET,
            })

            return true
        } catch (error) {
            return false
        }
    }

    async validateCredentials(username: string, password: string): Promise<any> {
        const admin = await this.prisma.admin.findUnique({
            where: { username }
        })

        if (admin && await bcrypt.compare(password, admin.password)) {
            const { password, ...result } = admin
            return result
        }

        return null
    }

    private generateTokens(payload: { sub: string, username: string, password: string, address: string, role: string }): any {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        }
    }

    private generateAccessToken(payload: { sub: string, username: string, password: string, address: string, role: string }): string {
        return this.jwtService.sign(payload)
    }

    private generateRefreshToken(payload: { sub: string, username: string, password: string, address: string, role: string }): string {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRESIN
        })
    }

}
