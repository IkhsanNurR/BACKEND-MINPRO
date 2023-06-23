import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { users, users_email } from "models/usersSchema";
import { JobModule } from "./job/job.module";

@Module({
  imports: [SequelizeModule.forFeature([users, users_email])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
