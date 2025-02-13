import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotImplementedException } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOneByEmail(@Args('id', { type: () => ID }) id: string): Promise<User> {
    throw new NotImplementedException("findOneByEmail resolver not implemented yet");
    
    //return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  blockUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.block(id);
  }
}
