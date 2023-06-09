import { Module } from '@nestjs/common';
import { BootcampService } from './bootcamp.service';
import { BootcampController } from './bootcamp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { bootcamp } from '../../models'; -- ini tabelnya
@Module({
  // imports:[SequelizeModule.forFeature([bootcamp])],
  controllers: [BootcampController],
  providers: [BootcampService],
})
export class BootcampModule {}
