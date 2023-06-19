import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { UsersModule } from '../users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {  users_roles } from 'models/usersSchema';

@Module({
  imports: [UsersModule,SequelizeModule.forFeature([users_roles])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule { }
