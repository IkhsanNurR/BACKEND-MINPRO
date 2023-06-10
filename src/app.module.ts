import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { MasterModule } from "./master/master.module";
import { HrModule } from "./hr/hr.module";
import { CurriculumModule } from "./curriculum/curriculum.module";
import { BootcampModule } from "./bootcamp/bootcamp.module";
// import { JobhireModule } from './jobhire/jobhire.module';
// import { SalesModule } from './sales/sales.module';
// import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'image/product'), // Sesuaikan dengan path ke folder gambar Anda
    // }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
    }),
    // UsersModule,
    // MasterModule,
    // HrModule,
    // CurriculumModule,
    BootcampModule,
    // JobhireModule,
    // SalesModule,
    // PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
