import { Injectable } from "@nestjs/common";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Sequelize } from "sequelize-typescript";
import { UsersService } from "../users.service";
import { InjectModel } from "@nestjs/sequelize";
import { users, users_roles } from "models/usersSchema";

@Injectable()
export class JobService {
  constructor(
    private sequelize: Sequelize,
    private userService: UsersService,
    @InjectModel(users_roles) private readonly UserRole: typeof users_roles
  ) {}
  async applyJob(id: number, postId: number) {
    try {
      const userRole = await this.userService.findUserById(+id);

      if (userRole.role_name !== "Talent") {
        await this.UserRole.update(
          {
            usro_role_id: 8,
          },
          {
            where: {
              usro_entity_id: id,
            },
          }
        );
      }

      const data = [
        {
          taap_user_entity_id: id,
          taap_entity_id: postId,
        },
      ];

      const res = await this.sequelize.query(
        `CALL jobhire.createtalent('${JSON.stringify(data)}')`
      );

      return {
        data: res,
        message: "Sukses Apply Job",
        status: 200,
      };
    } catch (error) {
      return error.message;
    }
  }
}
