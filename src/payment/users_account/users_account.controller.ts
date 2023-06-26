import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersAccountService } from './users_account.service';
import { CreateUsersAccountDto } from './dto/create-users_account.dto';
import { UpdateUsersAccountDto } from './dto/update-users_account.dto';

@Controller('users-account')
export class UsersAccountController {
  constructor(private readonly usersAccountService: UsersAccountService) {}

  @Post('Create')
  createWBANK(@Body() createUsersAccountDto: CreateUsersAccountDto) {
    return this.usersAccountService.createUserAccount(createUsersAccountDto);
  }

  @Get('All')
  findAll() {
    return this.usersAccountService.findAllUserAccount();
  }

  @Get('One/:id')
  findOne(@Param('id') id: string) {
    return this.usersAccountService.findOneUserAccount(+id);
  }

  @Put('Update/:id')
  updateAccount(@Param('id') id: string, @Body() updateUsersAccountDto: UpdateUsersAccountDto) {
    return this.usersAccountService.updateUserAccount(+id, updateUsersAccountDto);
  }

  @Delete('Delete/:id')
  remove(@Param('id') id: string) {
    return this.usersAccountService.deleteUserAccount(+id);
  }
}
