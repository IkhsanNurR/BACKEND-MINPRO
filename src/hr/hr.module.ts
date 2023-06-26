import { Module } from "@nestjs/common";
import { HrService } from "./hr.service";
import { HrController } from "./hr.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import {
  department,
  employee,
  employee_client_contract,
  employee_department_history,
  employee_pay_history,
} from "models/hrSchema";
import { job_role } from "models/masterSchema";
import { users } from "models/usersSchema";
// import { hr } from '../../models'; -- ini tabelnya

@Module({
  imports: [
    SequelizeModule.forFeature([
      employee,
      department,
      employee_department_history,
      employee_client_contract,
      employee_pay_history,
      job_role,
      users,
    ]),
  ],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
