import { Controller, Post, Param } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Controller("users/job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("/apply/:id/:postid")
  create(@Param("id") id: number, @Param("postid") postid: number) {
    return this.jobService.applyJob(+id, +postid);
  }
}
