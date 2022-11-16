import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserContext } from '../../user/decorators/user-context.decorator'
import { AuthService } from '../services/auth.service'
import { Auth } from '../models/auth.model'
import { LoginInput } from '../inputs/login.input'
import { SignupInput } from '../inputs/signup.input'
import { TokenArg } from '../args/token.arg'

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(returns => Boolean)
    verifyToken(@Args() { token }: TokenArg): Promise<boolean | null> {
        return this.authService.verifyToken(token)
    }
    
    @Mutation(returns => Auth)
    login(@Args('input') input: LoginInput, @UserContext() context): Promise<Auth | null> {
        return this.authService.login(input, context)
    }

    @Mutation(returns => Auth)
    signup(@Args('input') input: SignupInput): Promise<Auth | null> {
        return this.authService.signup(input)
    }

    @Mutation(returns => Auth)
    refreshToken(@Args() { token }: TokenArg): Promise<Auth | null> {
        return this.authService.refreshToken(token)
    }

}
