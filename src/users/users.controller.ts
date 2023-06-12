import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/student')
  signUpExternal(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUpStudent(createUserDto);
  }

  @Get('/kandidat')
  findAllKandidat() {
    return this.usersService.findAllKandidat()
  }

  @Get('talent')
  findAllTalent(){
    return this.usersService.findAllTalent()
  }

  @Get('all')
  findAllUsers(){
    return this.usersService.findAllUsers()
  }

  @Get('/username/:username')
  findByName(@Param('username') username: string) {
    return this.usersService.findByName(username);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
