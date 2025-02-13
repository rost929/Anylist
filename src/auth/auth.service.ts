import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/inputs/login.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(signupInput: SignUpInput): Promise<AuthResponse> {
    console.log({ signupInput });

    const user = await this.usersService.create(signupInput);

    const token = 'abc';

    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOneByEmail(email);

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) {
      throw new BadRequestException('Email/Password does not match');
    }

    const token = 'ABC123';

    return {
      token,
      user,
    };
  }
}
