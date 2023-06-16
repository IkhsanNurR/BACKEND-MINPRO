import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { HrModule } from './hr/hr.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { BootcampModule } from './bootcamp/bootcamp.module';
import { JobhireModule } from './jobhire/jobhire.module';
import { SalesModule } from './sales/sales.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './users/profile/profile.module';
import { AuthModule } from './users/auth/auth.module';
import { CityModule } from './master/city/city.module';
import { AddressTypeModule } from './master/address_type/address_type.module';
import { SkillTypeModule } from './master/skill_type/skill_type.module';
import { AddressModule } from './master/address/address.module';
import { skill_type } from 'models/masterSchema';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [skill_type],
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule,
    HrModule,
    CurriculumModule,
    BootcampModule,
    JobhireModule,
    SalesModule,
    PaymentModule,
    ProfileModule,
    AuthModule,
    CityModule,
    AddressTypeModule,
    SkillTypeModule,
    AddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
