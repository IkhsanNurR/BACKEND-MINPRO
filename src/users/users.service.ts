import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class UsersService {

  constructor(
    private sequelize: Sequelize
  ) { }

  async signUpStudent(createUserDto: CreateUserDto) {
    try {
      let phoneCode = 'Cell'
      createUserDto.uspo_ponty_code = phoneCode

      let role = 6
      createUserDto.usro_role_id = role


      if (createUserDto.password !== createUserDto.confirmPassword)
        throw new Error("Password don't match")

      let passHash = await bcrypt.hash(createUserDto.password, 10)
      createUserDto.password = passHash

      const res = await this.sequelize.query('CALL users.signupexternal(:username, :password, :role, :phone, :email, :phoneCode)', {
        replacements: {
          username: createUserDto.usernameOrEmail,
          password: createUserDto.password,
          role: createUserDto.usro_role_id,
          phone: createUserDto.uspo_number,
          email: createUserDto.pmail_address,
          phoneCode: createUserDto.uspo_ponty_code
        }
      });

      return {
        data: res,
        status: 200,
        message: 'sukses'
      }
    } catch (error) {
      if (error.message === "Validation error")
        return {
          message: "Username is already taken",
          status: 400
        }
      return { message: error.message, status: 400 }
    }

  }

  async findAllUsers() {
    try {
      const res = await this.sequelize.query('select * from users.usersall')
      return res[0]
    } catch (error) {
      return error.message
    }
  }

  async findUserById(id: number) {
    try {
      const res = await this.sequelize.query('select * from users.usersall where user_entity_id = :id', {
        replacements: { id },
        type: QueryTypes.SELECT
      })
      return res[0]
    } catch (error) {
      return error.message
    }
  }

  async findByName(username: string): Promise<any> {
    try {
      const data = await this.sequelize.query('select * from users.usersall where user_name = :username', {
        replacements: { username },
        type: QueryTypes.SELECT
      })
      if (!data[0]) throw new Error("Data users tidak ditemukan")
      return data[0]
    } catch (error) {
      return error.message
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const data = await this.sequelize.query('select * from users.usersall where pmail_address = :email', {
        replacements: { email },
        type: QueryTypes.SELECT
      })
      if (!data[0]) throw new Error("Data users tidak ditemukan")
      return data[0]
    } catch (error) {
      return error.message
    }
  }
}
