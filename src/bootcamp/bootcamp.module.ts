import { Module } from "@nestjs/common";
import { BootcampService } from "./bootcamp.service";
import { BootcampController } from "./bootcamp.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import {
  batch,
  batch_trainee,
  batch_trainee_evaluation,
  program_apply,
  program_apply_progress,
  talents,
  trainer_programs,
} from "models/bootcampSchema";
import {
  users,
  users_education,
  users_email,
  users_media,
} from "models/usersSchema";
import { program_entity } from "models/curriculumSchema";
@Module({
  imports: [
    SequelizeModule.forFeature([
      batch,
      batch_trainee,
      batch_trainee_evaluation,
      program_apply,
      program_apply_progress,
      talents,
      trainer_programs,
      users,
      users_email,
      users_media,
      users_education,
      program_entity,
    ]),
  ],
  controllers: [BootcampController],
  providers: [BootcampService],
})
export class BootcampModule {}
