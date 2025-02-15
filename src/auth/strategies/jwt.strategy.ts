import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { ValidateUserResponse } from '../types/validate-user-response.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey:
        configService.get('JWT_SECRET', { infer: true }) ?? 'default',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<ValidateUserResponse> {
    const { id } = payload;

    const user = await this.authService.validateUser(id);

    return user;
  }
}
