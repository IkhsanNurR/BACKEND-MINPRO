import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { Salesorder1Service } from "./salesorder1.service";

@Controller("sales/salesorder")
export class Salesorder1Controller {
  constructor(private readonly salesorder1Service: Salesorder1Service) {}

  @Post()
  create(@Body() createSalesorder1Dto: any) {
    return this.salesorder1Service.create(createSalesorder1Dto);
  }

  @Get()
  findAll() {
    return this.salesorder1Service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.salesorder1Service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSalesorder1Dto: any) {
    return this.salesorder1Service.update(+id, updateSalesorder1Dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.salesorder1Service.remove(+id);
  }
}
