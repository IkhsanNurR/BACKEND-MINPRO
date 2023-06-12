import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { users, users_email } from 'models/usersSchema';
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(users) private readonly User: typeof users,
    @InjectModel(users_email) private readonly UserEmail: typeof users_email
  ) { }

  async editProfile(id: number, updateProfileDto: UpdateProfileDto, file: Express.Multer.File) {
    try {
      const user = await this.findOne(id)

      let setImage = user.user_photo

      // if (updateProfileDto.user_photo) {
      //   fs.unlinkSync('./public/users/' + user.user_photo);
      //   setImage = file.filename;
      // }
  
      // const res = await this.User.update({
      //   user_name: updateProfileDto.user_name,
      //   user_first_name: updateProfileDto.user_first_name,
      //   user_last_name: updateProfileDto.user_last_name,
      //   user_birth_date: updateProfileDto.user_birth_date,
      //   user_photo: setImage,
      // }, {
      //   where: {
      //     user_entity_id: id,
      //   },
      // });
  
      // return {
      //   data: res,
      //   status: 200,
      //   message: 'sukses',
      // };
  

      if (setImage === null) {
        const res = await this.User.update({
          user_name: updateProfileDto.user_name,
          user_first_name: updateProfileDto.user_first_name,
          user_last_name: updateProfileDto.user_last_name,
          user_birth_date: updateProfileDto.user_birth_date,
          user_photo: updateProfileDto.user_photo
        }, {
          where: {
            user_entity_id: id
          }
        })
        return {
          data: res,
          status: 200,
          message: 'sukses'
        }
      } else if (setImage.length > 0) {

        if (updateProfileDto.user_photo) {
          fs.unlinkSync('./public/users/' + user.user_photo)
          setImage = file.filename
        }
        const res = await this.User.update({
          user_name: updateProfileDto.user_name,
          user_first_name: updateProfileDto.user_first_name,
          user_last_name: updateProfileDto.user_last_name,
          user_birth_date: updateProfileDto.user_birth_date,
          user_photo: setImage
        }, {
          where: {
            user_entity_id: id
          }
        })
        return {
          data: res,
          status: 200,
          message: 'sukses'
        }
      }

    } catch (error) {
      return error.message
    }
  }

  async changePassword(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this.findOne(+id)

      const match = await bcrypt.compare(updateProfileDto.user_password, user.user_password)
      if (!match) throw new Error("Password salah")

      if (updateProfileDto.newPassword != updateProfileDto.retypePassword) throw new Error("Password Baru Tidak Cocok")

      const hashPass = await bcrypt.hash(updateProfileDto.newPassword, 10)

      const res = await this.User.update({
        user_password: hashPass
      }, {
        where: {
          user_entity_id: id
        }
      })

      return {
        data: res,
        status: 200,
        message: 'sukses'
      }
    } catch (error) {
      return error.message
    }
  }

  async addEmail(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const res = await this.UserEmail.create({
        pmail_entity_id: id,
        pmail_address: updateProfileDto.newEmail
      })
      return {
        data: res,
        status: 200,
        message: "sukses"
      }
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: number): Promise<users> {
    try {
      const data = await this.User.findByPk(+id)
      return data
    } catch (error) {
      return error.message
    }
  }

}
