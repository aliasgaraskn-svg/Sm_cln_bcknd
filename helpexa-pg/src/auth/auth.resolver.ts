import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, AuthPayload } from './auth.model';
import { User } from '../database/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(
    @Args('input') input: LoginInput,
    @Context() context: any,
  ) {
    const payload = await this.authService.login(input, context.req.sessionID);
    context.req.session.userId = payload.user.id;
    return payload;
  }

  @Query(() => User, { name: 'me', nullable: true })
  async me(@Context() context: any) {
    if (context.req.session && context.req.session.userId) {
      return this.authService.getUserById(context.req.session.userId);
    }
    return null;
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any) {
    await this.authService.logout(context.req.sessionID);
    return new Promise((resolve) => {
      context.req.session.destroy(() => {
        resolve(true);
      });
    });
  }
}
