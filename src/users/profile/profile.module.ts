import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models/usersSchema';

@Module({
  imports:[SequelizeModule.forFeature([users])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
