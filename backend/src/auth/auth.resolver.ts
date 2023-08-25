import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/typeorm';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
    async login(@Args('username') username: string, @Args('password') password: string): Promise<any> {
      const user = await this.authService.validateUser(username, password);

      if (!user) {
        throw new Error('Invalid credentials');
      }
      console.log(user);

      return this.authService.login(user);
  }
}
