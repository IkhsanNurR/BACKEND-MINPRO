import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BankModule } from "./bank/bank.module";
import { FintechModule } from "./fintech/fintech.module";
import { TransactionPaymentModule } from "./transaction_payment/transaction_payment.module";
import { UsersAccountModule } from "./users_account/users_account.module";

@Module({
  imports: [
    // SequelizeModule.forRootAsync({
    //   useFactory: () => ({
    //     dialect: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: '9005',
    //     database: 'MinPro',
    //     models: [],
    //     autoLoadModels: true,
    //   }),
    // }),
    BankModule,
    FintechModule,
    TransactionPaymentModule,
    UsersAccountModule,
  ],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
