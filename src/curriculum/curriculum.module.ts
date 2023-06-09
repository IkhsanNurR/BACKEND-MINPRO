import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { curriculum } from '../../models'; -- ini tabelnya
@Module({
  // imports:[SequelizeModule.forFeature([curriculum])],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
