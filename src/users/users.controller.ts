import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/student")
  signUpExternal(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUpStudent(createUserDto);
  }

  @Post("/employee")
  signUpInternal(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUpEmployee(createUserDto);
  }

  @Get("all")
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get("/username/:username")
  findByName(@Param("username") username: string) {
    return this.usersService.findByName(username);
  }

  @Get("/user/:id")
  findById(@Param("id") id: number) {
    return this.usersService.findUserById(+id);
  }

  @Get("/email/:email")
  findByEmail(@Param("email") email: string) {
    return this.usersService.findByEmail(email);
  }
}
