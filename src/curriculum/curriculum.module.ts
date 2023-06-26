import { Module } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CurriculumController } from "./curriculum.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import {
  program_entity,
  program_entity_description,
  program_reviews,
  section_detail,
  section_detail_material,
  sections,
} from "../../models/curriculumSchema";
@Module({
  imports: [
    SequelizeModule.forFeature([
      program_entity,
      program_entity_description,
      program_reviews,
      section_detail,
      section_detail_material,
      sections,
    ]),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
