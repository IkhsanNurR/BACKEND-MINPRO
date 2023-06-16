import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { phone_number_type, users, users_address, users_education, users_email, users_experiences, users_phones } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([users, users_email, users_phones, phone_number_type, users_address, users_education, users_experiences])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule { }
