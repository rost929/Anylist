import { Injectable, NotImplementedException } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

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
}
