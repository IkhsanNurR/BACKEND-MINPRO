import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { city } from 'models/masterSchema';

@Module({
  imports:[SequelizeModule.forFeature([city])],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
