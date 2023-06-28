import { Injectable } from "@nestjs/common";
import { CreateHrDto } from "./dto/create-hr.dto";
import { UpdateHrDto } from "./dto/update-hr.dto";
import { Sequelize } from "sequelize-typescript";
import { users } from "models/usersSchema";
import messageHelper from "../../src/messagehelper/message";
import { employee } from "models/hrSchema";

@Injectable()
export class HrService {
  constructor(private sequelize: Sequelize) {}

  async createEmployee(createHrDto: any): Promise<any> {
    try {
      console.log("userEntity", createHrDto);
      const user = await users.findOne({
        where: { user_entity_id: +createHrDto.emp_entity_id },
      });
      if (!user) {
        throw new Error("id tidak ada");
      } else {
        const sendData = {
          emp_entity_id: +createHrDto.emp_entity_id,
          emp_emp_number: createHrDto.emp_emp_number,
          emp_national_id: createHrDto.emp_national_id,
          emp_birth_date: createHrDto.emp_birth_date,
          emp_marital_status: createHrDto.emp_marital_status,
          emp_gender: createHrDto.emp_gender,
          emp_hire_date: createHrDto.emp_hire_date,
          emp_end_contract: createHrDto.emp_end_contract,
          emp_salaried_flag: createHrDto.emp_salaried_flag,
          emp_vacation_hours: createHrDto.emp_vacation_hours,
          emp_sickleave_hours: createHrDto.emp_sickleave_hours,
          emp_current_flag: createHrDto.emp_current_flag,
          emp_type: createHrDto.emp_type,
          emp_joro_id: createHrDto.emp_joro_id,
          emp_emp_entity_id: createHrDto.emp_emp_entity_id,
          user_role: createHrDto.user_role,
          edhi_dept_id: createHrDto.edhi_dept_id,
        };

        const data = `${JSON.stringify(sendData)}`;
        const query = `CALL hr.createdataemployee('${data}')`;
        // const query = `CALL hr.createemployee('${createHrDto.emp_entity_id,createHrDto.emp_emp_number,createHrDto.emp_national_id,createHrDto.emp_birth_date,createHrDto.emp_marital_status,createHrDto.emp_gender,createHrDto.emp_hire_date,createHrDto.emp_end_contract,createHrDto.emp_salaried_flag,createHrDto.emp_vacation_hours,createHrDto.emp_sickleave_hours,createHrDto.emp_current_flag, createHrDto.emp_type,createHrDto.emp_joro_id,createHrDto.emp_emp_entity_id,createHrDto.user_role,createHrDto.department_id}')`
        console.log(query);
        const result = await this.sequelize.query(query);

        return messageHelper(result, 200, "Bisa");
      }
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa");
    }
  }

  //

  async updateEmployee(createHrDto: any): Promise<any> {
    try {
      const user = await users.findOne({
        where: { user_entity_id: createHrDto.emp_entity_id },
      });
      if (!user) {
        throw new Error("id tidak ada");
      } else {
        const sendData = {
          emp_entity_id: createHrDto.emp_entity_id,
          emp_hire_date: createHrDto.emp_hire_date,
          emp_type: createHrDto.emp_type,
          emp_joro_id: createHrDto.emp_joro_id,
          edhi_dept_id: createHrDto.edhi_dept_id,
        };

        const data = `${JSON.stringify(sendData)}`;
        const query = `CALL hr.updateDataEmployee('${data}')`;
        // const query = `CALL hr.createemployee('${createHrDto.emp_entity_id,createHrDto.emp_emp_number,createHrDto.emp_national_id,createHrDto.emp_birth_date,createHrDto.emp_marital_status,createHrDto.emp_gender,createHrDto.emp_hire_date,createHrDto.emp_end_contract,createHrDto.emp_salaried_flag,createHrDto.emp_vacation_hours,createHrDto.emp_sickleave_hours,createHrDto.emp_current_flag, createHrDto.emp_type,createHrDto.emp_joro_id,createHrDto.emp_emp_entity_id,createHrDto.user_role,createHrDto.department_id}')`
        console.log(query);
        const result = await this.sequelize.query(query);

        return messageHelper(result, 200, "Bisa");
      }
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa");
    }
  }

  async createSalary(createHrDto: CreateHrDto): Promise<any> {
    try {
      const user = await users.findOne({
        where: { user_entity_id: createHrDto.ephi_entity_id },
      });
      if (!user) {
        throw new Error("id tidak ada");
      } else {
        const sendData = {
          ephi_entity_id: createHrDto.ephi_entity_id,
          ephi_rate_change_date: createHrDto.ephi_rate_change_date,
          ephi_rate_salary: createHrDto.ephi_rate_salary,
          ephi_pay_frequence: createHrDto.ephi_pay_frequence,
        };

        const data = `${JSON.stringify(sendData)}`;
        const query = `CALL hr.createSalaryEmployee('${data}')`;
        // const query = `CALL hr.createemployee('${createHrDto.emp_entity_id,createHrDto.emp_emp_number,createHrDto.emp_national_id,createHrDto.emp_birth_date,createHrDto.emp_marital_status,createHrDto.emp_gender,createHrDto.emp_hire_date,createHrDto.emp_end_contract,createHrDto.emp_salaried_flag,createHrDto.emp_vacation_hours,createHrDto.emp_sickleave_hours,createHrDto.emp_current_flag, createHrDto.emp_type,createHrDto.emp_joro_id,createHrDto.emp_emp_entity_id,createHrDto.user_role,createHrDto.department_id}')`
        console.log(query);
        const result = await this.sequelize.query(query);

        return messageHelper(result, 200, "Bisa");
      }
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa");
    }
  }

  async createContractClientEmployee(createHrDto: any): Promise<any> {
    try {
      const user = await users.findOne({
        where: { user_entity_id: createHrDto.emp_entity_id },
      });
      if (!user) {
        throw new Error("id tidak ada");
      } else {
        const sendData = {
          emp_entity_id: createHrDto.emp_entity_id,
          emp_emp_number: createHrDto.emp_emp_number,
          emp_birth_date: createHrDto.emp_birth_date,
          emp_hire_date: createHrDto.hireDate,
          emp_end_contract: createHrDto.endContract,
          emp_type: createHrDto.emp_type,
          emp_joro_id: createHrDto.emp_joro_id,
          emp_emp_entity_id: createHrDto.emp_emp_entity_id,
          edhi_dept_id: +createHrDto.edhi_dept_id,
          ecco_contract_no: createHrDto.ecco_contract_no,
          ecco_contract_date: createHrDto.ecco_contract_date,
          ecco_notes: createHrDto.ecco_notes,
          ecco_media_link: createHrDto.ecco_media_link,
          ecco_joty_id: +createHrDto.ecco_joty_id,
          ecco_account_manager: createHrDto.ecco_account_manager,
          ecco_clit_id: createHrDto.ecco_clit_id,
          ecco_status: createHrDto.ecco_status,
          status: createHrDto.talent_status,
        };

        const data = `${JSON.stringify(sendData)}`;
        const query = `CALL hr.createClientContractEmployee('${data}')`;
        // const query = `CALL hr.createemployee('${createHrDto.emp_entity_id,createHrDto.emp_emp_number,createHrDto.emp_national_id,createHrDto.emp_birth_date,createHrDto.emp_marital_status,createHrDto.emp_gender,createHrDto.emp_hire_date,createHrDto.emp_end_contract,createHrDto.emp_salaried_flag,createHrDto.emp_vacation_hours,createHrDto.emp_sickleave_hours,createHrDto.emp_current_flag, createHrDto.emp_type,createHrDto.emp_joro_id,createHrDto.emp_emp_entity_id,createHrDto.user_role,createHrDto.department_id}')`
        console.log(query);

        const result = await this.sequelize.query(query);
        console.log("query tidak bisa");

        return messageHelper(result, 201, "Success");
      }
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa");
    }
  }

  async createClientContractEmployeeFromJobPost(
    createHrDto: CreateHrDto
  ): Promise<any> {
    try {
      const user = await users.findOne({
        where: { user_entity_id: createHrDto.emp_entity_id },
      });
      if (!user) {
        throw new Error("id tidak ada");
      } else {
        const sendData = {
          emp_entity_id: createHrDto.emp_entity_id,
          emp_emp_number: createHrDto.emp_emp_number,
          emp_national_id: createHrDto.emp_national_id,
          emp_birth_date: createHrDto.emp_birth_date,
          emp_marital_status: createHrDto.emp_marital_status,
          emp_gender: createHrDto.emp_gender,
          emp_hire_date: createHrDto.emp_hire_date,
          emp_end_contract: createHrDto.emp_end_contract,
          emp_salaried_flag: createHrDto.emp_salaried_flag,
          emp_vacation_hours: createHrDto.emp_vacation_hours,
          emp_sickleave_hours: createHrDto.emp_sickleave_hours,
          emp_current_flag: createHrDto.emp_current_flag,
          emp_type: createHrDto.emp_type,
          emp_joro_id: createHrDto.emp_joro_id,
          emp_emp_entity_id: createHrDto.emp_emp_entity_id,
          user_role: createHrDto.user_role,
          edhi_dept_id: createHrDto.edhi_dept_id,
          ecco_contract_no: createHrDto.ecco_contract_no,
          ecco_contract_date: createHrDto.ecco_contract_date,
          ecco_start_date: createHrDto.ecco_start_date,
          ecco_end_date: createHrDto.ecco_end_date,
          ecco_notes: createHrDto.ecco_notes,
          ecco_media_link: createHrDto.ecco_media_link,
          ecco_joty_id: createHrDto.ecco_joty_id,
          ecco_account_manager: createHrDto.ecco_account_manager,
          ecco_clit_id: createHrDto.ecco_clit_id,
          ecco_status: createHrDto.ecco_status,
          talent_status: createHrDto.talent_status,
        };
        const data = `${JSON.stringify(sendData)}`;
        const query = `CALL hr.createClientContractEmployeeFromJobPost('${data}')`;
        // const query = `CALL hr.createemployee('${createHrDto.emp_entity_id,createHrDto.emp_emp_number,createHrDto.emp_national_id,createHrDto.emp_birth_date,createHrDto.emp_marital_status,createHrDto.emp_gender,createHrDto.emp_hire_date,createHrDto.emp_end_contract,createHrDto.emp_salaried_flag,createHrDto.emp_vacation_hours,createHrDto.emp_sickleave_hours,createHrDto.emp_current_flag, createHrDto.emp_type,createHrDto.emp_joro_id,createHrDto.emp_emp_entity_id,createHrDto.user_role,createHrDto.department_id}')`
        console.log(query);
        const result = await this.sequelize.query(query);

        return messageHelper(result, 201, "Bisa Apply Talent");
      }
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async filterEmployeefromJobPost(): Promise<any> {
    try {
      const query = `select * from hr.pro_candidate_view`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async findAll(): Promise<any> {
    try {
      const query = `select * from hr.detailEmployee`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async findEmployee(user_id: any): Promise<any> {
    try {
      console.log("ini", user_id);

      const query = `select * from hr.detailEmployee where user_entity_id = ${user_id} order by edhi_modified_date desc limit 1`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async findForEmployee(): Promise<any> {
    try {
      const query = `select * from hr.filterEmployeeUser`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async filterDepartment(): Promise<any> {
    try {
      const query = `select * from hr.department`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }
  async filterJobRole(): Promise<any> {
    try {
      const query = `select * from master.job_role`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async filterUserRole(): Promise<any> {
    try {
      const query = `select * from users.roles`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async getTalent(): Promise<any> {
    try {
      const query = `select * from hr.talentBootcamp`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async getClientForTalentBootcamp(): Promise<any> {
    try {
      const query = `select * from jobhire.client`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async getJobType(): Promise<any> {
    try {
      const query = `select * from master.job_type`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async getDepartmentHistory(id: any): Promise<any> {
    try {
      const query = `select * from hr.employeeDepartmentHistory where edhi_entity_id = ${id}`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  async getSalaryHistory(id: any): Promise<any> {
    try {
      const query = `select * from hr.employee_pay_history where ephi_entity_id = ${id}`;

      const result = await this.sequelize.query(query);

      return messageHelper(result, 201, "Bisa Apply Talent");
    } catch (error) {
      return messageHelper(error.message, 400, "Tidak Bisa Apply Talent");
    }
  }

  // select * from hr.employeeDepartmentHistory
}
