import { Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { hr } from '../../models'; -- ini tabelnya

@Module({
  // imports:[SequelizeModule.forFeature([hr])],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
