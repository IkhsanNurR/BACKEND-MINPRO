import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from "@nestjs/common";
import { HrService } from "./hr.service";
import { CreateHrDto } from "./dto/create-hr.dto";
import { UpdateHrDto } from "./dto/update-hr.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as crypto from "crypto";

@Controller("hr")
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post("create")
  createEmployee(@Body() createHrDto: any) {
    console.log("conroller", createHrDto);
    return this.hrService.createEmployee(createHrDto);
  }

  @Patch("update")
  updateEmployee(@Body() createHrDto: CreateHrDto) {
    return this.hrService.updateEmployee(createHrDto);
  }

  //

  @Post("createfrombootcamp")
  createContractClientEmployee(@Body() createHr: CreateHrDto) {
    return this.hrService.createContractClientEmployee(createHr);
  }

  //

  @Post("createfromjobhire")
  createClientContractEmployeeFromJobPost(@Body() createHr: CreateHrDto) {
    return this.hrService.createClientContractEmployeeFromJobPost(createHr);
  }

  @Get("employee")
  findAll() {
    return this.hrService.findAll();
  }

  @Get("employee-jobpost")
  filterEmployeefromJobPost() {
    return this.hrService.filterEmployeefromJobPost();
  }

  @Get("for-employee")
  findForEmployee() {
    return this.hrService.findForEmployee();
  }

  @Get("filter-department")
  filterDepartment() {
    return this.hrService.filterDepartment();
  }

  @Get("filter-jobrole")
  filterJobRole() {
    return this.hrService.filterJobRole();
  }

  @Get("filter-userrole")
  filterUserRole() {
    return this.hrService.filterUserRole();
  }

  @Get("talent")
  filterUgetTalentserRole() {
    return this.hrService.getTalent();
  }

  @Get("client-bootcamp")
  getClientForTalentBootcamp() {
    return this.hrService.getClientForTalentBootcamp();
  }

  @Get("jobtype")
  getJobType() {
    return this.hrService.getJobType();
  }

  @Get("find-one/:id")
  findEmployee(@Param("id") id: string) {
    return this.hrService.findEmployee(+id);
  }

  @Get("department-history/:id")
  getDepartmentHistory(@Param("id") id: string) {
    return this.hrService.getDepartmentHistory(+id);
  }

  @Get("pay-history/:id")
  getSalaryHistory(@Param("id") id: string) {
    return this.hrService.getSalaryHistory(+id);
  }
}
