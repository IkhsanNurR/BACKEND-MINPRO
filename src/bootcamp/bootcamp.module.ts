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
    ]),
  ],
  controllers: [BootcampController],
  providers: [BootcampService],
})
export class BootcampModule {}
