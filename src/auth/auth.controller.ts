import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  signUp(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  //   @HttpCode(HttpStatus.OK)
  //   @Post('reset-password')
  //   resetPassword(@Body() body: ResetPasswordDto) {
  //     return this.authService.resetPassword(body.token, body.password);
  //   }

  //   @HttpCode(HttpStatus.OK)
  //   @Post('change-password')
  //   changePassword(@Body() body: ChangePasswordDto) {
  //     return this.authService.changePassword(body.refreshToken, body.password);
  //   }
}
