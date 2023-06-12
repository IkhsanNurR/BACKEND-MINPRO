// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { RolesGuards } from './guards';
// import { APP_GUARD, Reflector } from '@nestjs/core';

// @Module({
//   imports: [
//     SequelizeModule.forRoot({
//       dialect: 'postgres',
//       host: 'localhost',
//       port: parseInt(process.env.DATABASE_PORT),
//       username: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       models: [],
//       autoLoadModels: true,
//     }),
//   ],
//   controllers: [],
//   providers: [
//     {
//       provide: APP_GUARD,
//       useClass: RolesGuards,
//     },
//     Reflector,
//   ],
// })
// //cara 1 login ini diaktifkan
// export class GuardsModule {}
