import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { phone_number_type, users, users_email, users_phones } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([users, users_email, users_phones, phone_number_type])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule { }
