import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { sales } from '../../models'; -- ini tabelnya
@Module({
  // imports:[SequelizeModule.forFeature([sales])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
