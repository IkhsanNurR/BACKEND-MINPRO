import { Controller, Post, Body, Get } from "@nestjs/common";
import { TransactionPaymentService } from "./transaction_payment.service";
import { CreateTransactionPaymentDto } from "./dto/create-transaction_payment.dto";
import { Sequelize } from "sequelize-typescript";

@Controller("transaction-payment")
export class TransactionPaymentController {
  constructor(
    private readonly transactionPaymentService: TransactionPaymentService,
    private sequelize: Sequelize
  ) {}

  @Post("Topup")
  topup(@Body() createTransactionPaymentDto: any) {
    return this.transactionPaymentService.Topup(createTransactionPaymentDto);
  }

  @Get("View")
  view() {
    return this.transactionPaymentService.TransactionView();
  }
}
