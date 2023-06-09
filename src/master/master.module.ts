import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  // imports:[SequelizeModule.forFeature([master])],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}
