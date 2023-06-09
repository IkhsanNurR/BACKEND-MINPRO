import { Injectable } from "@nestjs/common";
import { loginDto } from "./dto/create-auth.dto";
import { UsersService } from "../users.service";
import checkEmailOrUsername from "helpers/checkEmail";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: loginDto) {
    try {
      let res: any;

      if (checkEmailOrUsername(loginDto.usernameOrEmail) === "Email") {
        res = await this.userService.findByEmail(loginDto.usernameOrEmail);
        if (typeof res != "object") throw new Error("Email Tidak Ada");
      } else {
        res = await this.userService.findByName(loginDto.usernameOrEmail);
        if (typeof res != "object") throw new Error("Username Tidak Ada");
      }

      const match = await bcrypt.compare(loginDto.password, res.user_password);
      if (!match) throw new Error("password salah");

      const payload = { aud: loginDto.usernameOrEmail, sub: res.role_name };

      const token = await this.jwtService.signAsync(payload);

      return { token };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }
}
