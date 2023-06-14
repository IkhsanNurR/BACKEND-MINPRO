import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { address } from 'models/masterSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([address])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}