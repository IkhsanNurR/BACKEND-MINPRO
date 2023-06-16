import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { phone_number_type, users, users_address, users_education, users_email, users_experiences, users_phones } from 'models/usersSchema';
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'
import { Sequelize } from 'sequelize-typescript';

function isStartDateBeforeEndDate(startDate: Date, endDate: Date): boolean {
  return startDate < endDate;
}

@Injectable()
export class ProfileService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(users) private readonly User: typeof users,
    @InjectModel(users_email) private readonly UserEmail: typeof users_email,
    @InjectModel(users_phones) private readonly UserPhone: typeof users_phones,
    @InjectModel(phone_number_type) private readonly PhoneType: typeof phone_number_type,
    @InjectModel(users_address) private readonly UserAddress: typeof users_address,
    @InjectModel(users_education) private readonly UserEducation: typeof users_education,
    @InjectModel(users_experiences) private readonly UserExperiences: typeof users_experiences
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

  async addAddress(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      let replacements: any = {
        entityId: id,
        address1: updateProfileDto.newAddressLine1,
        addressPostalCode: updateProfileDto.newAddressPostalCode,
        addressCityId: updateProfileDto.newAddressCityId,
        addressTypeId: updateProfileDto.newAddressTypeId,
        address2: updateProfileDto.newAddressLine2 ?? ''
      };

      if (updateProfileDto.newAddressLine2) {
        replacements.address2 = updateProfileDto.newAddressLine2;
      }

      const res = await this.sequelize.query('CALL users.addAddress(:entityId,:address1,:addressPostalCode,:addressCityId,:addressTypeId' + (replacements.address2 ? ',:address2' : '') + ')', {
        replacements
      });

      return {
        data: res,
        status: 200,
        message: "sukses"
      };
    } catch (error) {
      return error.message;
    }
  }

  async editAddress(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      let replacements: any = {
        addressId: id,
        address1: updateProfileDto.newAddressLine1,
        addressPostalCode: updateProfileDto.newAddressPostalCode,
        addressCityId: updateProfileDto.newAddressCityId,
        addressTypeId: updateProfileDto.newAddressTypeId,
        address2: updateProfileDto.newAddressLine2 ?? ''
      };

      if (updateProfileDto.newAddressLine2) {
        replacements.address2 = updateProfileDto.newAddressLine2;
      }

      const res = await this.sequelize.query('CALL users.editAddress(:addressId,:address1,:addressPostalCode,:addressCityId,:addressTypeId' + (replacements.address2 ? ',:address2' : '') + ')', {
        replacements
      });

      return {
        data: res,
        status: 200,
        message: 'sukses'
      }
    } catch (error) {
      return error.message
    }
  }

  async deleteAddress(id: number) {
    try {
      await this.UserAddress.destroy({
        where: {
          etad_addr_id: id
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

  async addEducation(id: number, updateProfileDto: UpdateProfileDto) {
    try {

      const startDate = new Date(updateProfileDto.newStartDate);
      const endDate = new Date(updateProfileDto.newEndDate);

      if (!isStartDateBeforeEndDate(startDate, endDate)) {
        return {
          status: 400,
          message: "Start date must be before the end date",
        };
      }

      const graduateYear = endDate.getFullYear()
      const res = await this.UserEducation.create({
        usdu_entity_id: id,
        usdu_school: updateProfileDto.newSchool,
        usdu_degree: updateProfileDto.newDegree,
        usdu_field_study: updateProfileDto.newFieldStudy,
        usdu_graduate_year: graduateYear.toString(),
        usdu_start_date: updateProfileDto.newStartDate,
        usdu_end_date: updateProfileDto.newEndDate,
        usdu_grade: updateProfileDto.newGrade,
        usdu_activities: updateProfileDto.newActivitis,
        usdu_description: updateProfileDto.newDescription
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

  async editEducation(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const graduateYear = new Date(updateProfileDto.newEndDate).getFullYear()
      const res = await this.UserEducation.update({
        usdu_school: updateProfileDto.newSchool,
        usdu_degree: updateProfileDto.newDegree,
        usdu_field_study: updateProfileDto.newFieldStudy,
        usdu_graduate_year: graduateYear.toString(),
        usdu_start_date: updateProfileDto.newStartDate,
        usdu_end_date: updateProfileDto.newEndDate,
        usdu_grade: updateProfileDto.newGrade,
        usdu_activities: updateProfileDto.newActivitis,
        usdu_description: updateProfileDto.newDescription
      }, {
        where: {
          usdu_id: id
        }
      })
      return {
        data: res,
        status: 200,
        message: "Edit sukses"
      }
    } catch (error) {
      return error.message
    }
  }

  async deleteEducation(id: number) {
    try {
      await this.UserEducation.destroy({
        where: {
          usdu_id: id
        }
      })
      return {
        message: "sukses",
        status: 200
      }
    } catch (error) {
      return error.message
    }
  }

  async addExperiences(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const startDate = new Date(updateProfileDto.newStartDate);
      const endDate = new Date(updateProfileDto.newEndDate);

      if (!isStartDateBeforeEndDate(startDate, endDate)) {
        return {
          status: 400,
          message: "Start date must be before the end date",
        };
      }
      const res = await this.UserExperiences.create({
        usex_entity_id: id,
        usex_title: updateProfileDto.newTitle,
        usex_profile_headline: updateProfileDto.newHeadline,
        usex_company_name: updateProfileDto.newCompany,
        usex_city_id: updateProfileDto.newCity,
        usex_start_date: updateProfileDto.newStartDate,
        usex_end_date: updateProfileDto.newEndDate,
        usex_industry: updateProfileDto.newIndustry,
        usex_employment_type: updateProfileDto.newEmployeType,
        usex_description: updateProfileDto.newDescription,
        usex_experience_type: updateProfileDto.newExperienceType
      })
      return {
        data: res,
        message: "sukses",
        status: 200
      }
    } catch (error) {
      return error.message
    }
  }

  async editExperiences(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const startDate = new Date(updateProfileDto.newStartDate);
      const endDate = new Date(updateProfileDto.newEndDate);

      if (!isStartDateBeforeEndDate(startDate, endDate)) {
        return {
          status: 400,
          message: "Start date must be before the end date",
        };
      }
      const res = await this.UserExperiences.update({
        usex_title: updateProfileDto.newTitle,
        usex_profile_headline: updateProfileDto.newHeadline,
        usex_company_name: updateProfileDto.newCompany,
        usex_city_id: updateProfileDto.newCity,
        usex_start_date: updateProfileDto.newStartDate,
        usex_end_date: updateProfileDto.newEndDate,
        usex_industry: updateProfileDto.newIndustry,
        usex_employment_type: updateProfileDto.newEmployeType,
        usex_description: updateProfileDto.newDescription,
        usex_experience_type: updateProfileDto.newExperienceType
      }, {
        where: {
          usex_id: id
        }
      })
      return {
        data: res,
        message: "sukses",
        status: 200
      }
    } catch (error) {
      return error.message
    }
  }

  async deleteExperience(id: number) {
    try {
      await this.UserExperiences.destroy({
        where: {
          usex_id: id
        }
      })
      return {
        message: "sukses",
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
