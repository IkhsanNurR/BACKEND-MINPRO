import { Controller, Body, Patch, Param, UseInterceptors, UploadedFile, Get, Post, Delete, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { diskStorage } from 'multer';
import * as crypto from 'crypto'
import * as fs from 'fs'
import { FileInterceptor } from '@nestjs/platform-express';

const multerConfigResume = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/public/users/resume`)
    },
    filename: (req, file, callback) => {
      const salt =
        Math.random().toString(36).substring(2, 15)
      const imageNameWithSalt = file.originalname + salt;
      const md5Hash = crypto.createHmac("md5", '1234').update(imageNameWithSalt).digest('base64')
      const filename = `${md5Hash}_${file.originalname}`;
      callback(null, filename)
    }
  })
}

const multerConfigImage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/public/users/image`)
    },
    filename: (req, file, callback) => {
      const salt =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const imageNameWithSalt = file.originalname + salt;
      const md5Hash = crypto.createHmac("md5", '1234').update(imageNameWithSalt).digest('base64')
      const filename = `${md5Hash}_${file.originalname}`;
      callback(null, filename)
    }
  })
}

const validateImage = new ParseFilePipe({
  validators: [new FileTypeValidator({
    fileType: '.(png|jpg|jpeg|svg)',
  })]
  , fileIsRequired: false
})

const validateResume = new ParseFilePipe({
  validators: [new FileTypeValidator({
    fileType: '.(jpeg|jpg|pdf|word)',
  })]
  , fileIsRequired: false
})


@Controller('users/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Patch('/editprofile/:id')
  @UseInterceptors(FileInterceptor('user_photo', multerConfigImage))
  updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile(validateImage) file?: Express.Multer.File
  ) {

    try {
      if (file) {
        updateProfileDto.user_photo = file.filename
      }
      return this.profileService.editProfile(+id, updateProfileDto, file);
    } catch (error) {
      if (file) {
        fs.unlinkSync(file.path)
      }
      return error.message
    }
  }

  @Delete('/deleteResume/:id')
  deleteResume(@Param('id') id: number) {
    return this.profileService.deleteResume(+id)
  }

  @Post('/uploadResume/:id')
  @UseInterceptors(FileInterceptor('resume', multerConfigResume))
  uploadResume(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @UploadedFile(validateResume) file: Express.Multer.File) {
    try {
      if (file) {
        updateProfileDto.usme_filename = file.filename
      }
      return this.profileService.uploadResume(+id, updateProfileDto, file)
    } catch (error) {
      return error.message
    }
  }

  @Patch('/changePassword/:id')
  updatePassword(@Param('id') id: string, @Body() UpdateProfileDto: UpdateProfileDto) {
    return this.profileService.changePassword(+id, UpdateProfileDto)
  }

  @Post('/addEmail/:id')
  addEmail(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.addEmail(+id, updateProfileDto)
  }

  @Patch('/editEmail/:id')
  editEmail(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.editEmail(+id, updateProfileDto)
  }

  @Delete('/deleteEmail/:id')
  deleteEmail(@Param('id') id: string) {
    return this.profileService.deleteEmail(+id)
  }

  @Get('/pontycode')
  getPontyCode() {
    return this.profileService.getPontyCode()
  }

  @Post('/addPhone/:id')
  addPhone(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.addPhone(+id, updateProfileDto)
  }

  @Patch('/editPhone/:id/:phone_number')
  editPhone(@Param('id') id: number, @Param('phone_number') phone_number: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.editPhone(+id, phone_number, updateProfileDto)
  }

  @Delete('/deletePhone/:id/:phone_number')
  deletePhone(@Param('id') id: number, @Param('phone_number') phone_number: any) {
    return this.profileService.deletePhone(+id, phone_number)
  }

  @Post('/addAddress/:id')
  addAddress(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.addAddress(+id, updateProfileDto)
  }

  @Patch('/editAddress/:id')
  editAddress(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.editAddress(+id, updateProfileDto)
  }

  @Delete('/deleteAddress/:id')
  deleteAddress(@Param('id') id: number) {
    return this.profileService.deleteAddress(+id)
  }

  @Post('/addEducation/:id')
  addEducation(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.addEducation(+id, updateProfileDto)
  }

  @Patch('/editEducation/:id')
  editEducation(@Param('id') id: number, @Body() updateProfilDto: UpdateProfileDto) {
    return this.profileService.editEducation(+id, updateProfilDto)
  }

  @Delete('/deleteEducation/:id')
  deleteEducation(@Param('id') id: number) {
    return this.profileService.deleteEducation(+id)
  }

  @Post('/addExperiences/:id')
  addExperiences(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.addExperiences(+id, updateProfileDto)
  }

  @Patch('/editExperience/:id')
  editExperience(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.editExperiences(+id, updateProfileDto)
  }

  @Delete('/deleteExperience/:id')
  deleteExperience(@Param('id') id: number) {
    return this.profileService.deleteExperience(+id)
  }

  @Post('/addSkill/:id')
  addSkill(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.addSkill(+id, updateProfileDto)
  }

  @Delete('/deleteSkill/:id')
  deleteSkill(@Param('id') id: number) {
    return this.profileService.deleteSkill(+id)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileService.findOne(+id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOneResume(+id);
  }
}
