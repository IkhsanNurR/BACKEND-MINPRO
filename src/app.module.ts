import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { MasterModule } from './master/master.module';
import { HrModule } from './hr/hr.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { BootcampModule } from './bootcamp/bootcamp.module';
import { JobhireModule } from './jobhire/jobhire.module';
import { SalesModule } from './sales/sales.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './users/profile/profile.module';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule,
    MasterModule,
    HrModule,
    CurriculumModule,
    BootcampModule,
    JobhireModule,
    SalesModule,
    PaymentModule,
    ProfileModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
