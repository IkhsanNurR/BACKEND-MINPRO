import { Module } from '@nestjs/common';
import { JobhireService } from './jobhire.service';
import { JobhireController } from './jobhire.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { jobhire } from '../../models'; -- ini tabelnya
@Module({
  // imports:[SequelizeModule.forFeature([jobhire])],
  controllers: [JobhireController],
  providers: [JobhireService],
})
export class JobhireModule {}
