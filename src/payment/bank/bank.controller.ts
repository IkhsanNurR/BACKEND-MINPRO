import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { BankService } from "./bank.service";
import { CreateBankDto } from "./dto/create-bank.dto";
import { UpdateBankDto } from "./dto/update-bank.dto";

@Controller("bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post("Create")
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.createBank(createBankDto);
  }

  @Get("All")
  findAll() {
    return this.bankService.findAllBank();
  }

  @Get("One/:id")
  findOne(@Param("id") id: string) {
    return this.bankService.findOneBank(+id);
  }

  @Put("Update/:id")
  update(@Param("id") id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.updateBank(+id, updateBankDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bankService.deleteBank(+id);
  }
}
