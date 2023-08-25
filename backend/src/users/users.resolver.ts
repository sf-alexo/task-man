import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from 'src/typeorm';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

@Query(() => [User], { name: 'users' })
getUsers() {
  return this.usersService.getUsers();
}

@Query(() => User, { name: 'user' })
  findUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUsersById(id);
}

@Mutation(() => User)
  async createUser(@Args('createUserInput') input: CreateUserInput): Promise<User> {
  return this.usersService.createUser(input);
}

}
