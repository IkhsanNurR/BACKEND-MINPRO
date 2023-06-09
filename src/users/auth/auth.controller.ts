import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  signIn(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto)
  }

}
