import { Module } from "@nestjs/common";
import { JobHireService } from "./jobhire.service";
import { JobHireController } from "./jobhire.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import {
  client,
  job_category,
  job_photo,
  job_post,
  job_post_desc,
  talent_apply,
  talent_apply_progress,
} from "models/jobhireSchema";

@Module({
  imports: [
    SequelizeModule.forFeature([
      job_category,
      job_photo,
      job_post,
      job_post_desc,
      client,
      talent_apply,
      talent_apply_progress,
    ]),
  ],
  controllers: [JobHireController],
  providers: [JobHireService],
})
export class JobHireModule {}
