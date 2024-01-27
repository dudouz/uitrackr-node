import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<unknown> {
    const user = await this.usersService.findOne(email).then((user) => user);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout() {
    throw new Error('Method not implemented.');
  }
  forgotPassword(email: string) {
    console.log(email);

    throw new Error('Method not implemented.');
  }

  changePassword(refreshToken: string, password: string) {
    console.log(refreshToken, password);

    throw new Error('Method not implemented.');
  }
}
