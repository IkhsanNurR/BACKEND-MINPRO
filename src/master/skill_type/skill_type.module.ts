import { Module } from '@nestjs/common';
import { SkillTypeService } from './skill_type.service';
import { SkillTypeController } from './skill_type.controller';

@Module({
  controllers: [SkillTypeController],
  providers: [SkillTypeService]
})
export class SkillTypeModule {}
