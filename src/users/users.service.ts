import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { users, users_email } from "models/usersSchema";
import * as bcrypt from "bcrypt";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UsersService {
  constructor(private sequelize: Sequelize) {}

  async signUpBootcamp(createUserDto: CreateUserDto) {
    try {
      let phoneCode = "Cell";
      createUserDto.uspo_ponty_code = phoneCode;

      let role = 2;
      createUserDto.usro_role_id = role;

      let passHash = await bcrypt.hash(createUserDto.user_password, 10);
      createUserDto.user_password = passHash;

      const res = await this.sequelize.query(
        "CALL users.signupexternal(:username, :password, :role, :phone, :email, :phoneCode)",
        {
          replacements: {
            username: createUserDto.user_name,
            password: createUserDto.user_password,
            role: createUserDto.usro_role_id,
            phone: createUserDto.uspo_number,
            email: createUserDto.pmail_address,
            phoneCode: createUserDto.uspo_ponty_code,
          },
        }
      );

      return {
        data: res,
        status: 200,
        message: "sukses",
      };
    } catch (error) {
      return error.message;
    }
  }

  async findByName(username: string): Promise<any> {
    try {
      const data = await users.findOne({
        where: {
          user_name: username,
        },
        include: [
          {
            model: users_email,
          },
        ],
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const data = await users.findOne({
        include: [
          {
            model: users_email,
            where: {
              pmail_address: email,
            },
          },
        ],
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
}
