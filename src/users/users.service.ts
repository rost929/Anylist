import {
  BadRequestException,
  Injectable,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signupInput: SignUpInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Something wnet wrong');
    }
  }

  findAll() {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new NotImplementedException('findOne not implemented');
  }

  block(id: string): Promise<User> {
    throw new NotImplementedException('findOne not implemented');
  }
}
