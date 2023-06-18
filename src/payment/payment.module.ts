import { Module } from '@nestjs/common';
import { AppController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './payment.service';
import { BankModule } from './bank/bank.module';
import { FintechModule } from './fintech/fintech.module';
import { TransactionPaymentModule } from './transaction_payment/transaction_payment.module';
import { UsersAccountModule } from './users_account/users_account.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '9005',
        database: 'MinPro',
        models: [],
        autoLoadModels: true,
      }),
    }),
    BankModule,
    FintechModule,
    TransactionPaymentModule,
    UsersAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class PaymentModule {}
