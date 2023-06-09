import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'models/usersSchema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(users)
    private readonly User: typeof users
  ) { }


  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
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
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.User.findByPk(+id)
      return {
        data: res,
        status: 200,
        message: 'sukses'
      }
    } catch (error) {
      return error.message
    }
  }

}
