import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { phone_number_type, users, users_email, users_phones } from 'models/usersSchema';
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(users) private readonly User: typeof users,
    @InjectModel(users_email) private readonly UserEmail: typeof users_email,
    @InjectModel(users_phones) private readonly UserPhone: typeof users_phones,
    @InjectModel(phone_number_type) private readonly PhoneType: typeof phone_number_type
  ) { }

  async editProfile(id: number, updateProfileDto: UpdateProfileDto, file?: Express.Multer.File) {
    try {
      const user = await this.findOne(id)

      let setImage = user.user_photo

      if (file) {
        if (setImage !== null) {
          fs.unlinkSync('./public/users/' + user.user_photo);
        }
        setImage = file.filename;
      }

      const res = await this.User.update(
        {
          user_name: updateProfileDto.user_name,
          user_first_name: updateProfileDto.user_first_name,
          user_last_name: updateProfileDto.user_last_name,
          user_birth_date: updateProfileDto.user_birth_date,
          user_photo: setImage || updateProfileDto.user_photo,
        },
        {
          where: {
            user_entity_id: id,
          },
          returning: true
        }
      );
      return {
        data: res,
        status: 200,
        message: "sukses"
      }
    } catch (error) {
      if (file && updateProfileDto.user_photo) {
        fs.unlinkSync('./public/users/' + file.filename);
      }
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

  async editEmail(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const res = await this.UserEmail.update({
        pmail_address: updateProfileDto.newEmail
      }, {
        where: {
          pmail_id: id
        }
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

  async deleteEmail(id: number) {
    try {
      await this.UserEmail.destroy({
        where: {
          pmail_id: id
        }
      })
      return {
        status: 200,
        message: "Berhasil dihapus"
      }
    } catch (error) {
      return error.message
    }
  }

  async addPhone(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const res = await this.UserPhone.create({
        uspo_entity_id: id,
        uspo_number: updateProfileDto.newPhone,
        uspo_ponty_code: updateProfileDto.newPontyCode
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

  async editPhone(id: number, phone_number: any, updateProfileDto: UpdateProfileDto) {
    try {
      const res = await this.UserPhone.update({
        uspo_number: updateProfileDto.newPhone,
        uspo_ponty_code: updateProfileDto.newPontyCode,
      }, {
        where: {
          uspo_entity_id: id,
          uspo_number: phone_number
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

  async deletePhone(id: number, phone_number: any) {
    try {
      await this.UserPhone.destroy({
        where: {
          uspo_entity_id: id,
          uspo_number: phone_number
        }
      })

      return {
        message: 'sukses',
        status: 200
      }
    } catch (error) {
      return error.message
    }
  }

  async getPontyCode(): Promise<any> {
    try {
      const res = await this.PhoneType.findAll()
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
