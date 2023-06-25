import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CartitemModule } from "./cartitem/cartitem.module";
import { PaymentModule } from "./payment/payment.module";
import { SpecialofferModule } from "./specialoffer/specialoffer.module";
// import { sales } from '../../models'; -- ini tabelnya
import { Salesorder1Module } from './salesorder1/salesorder1.module';
@Module({
  // imports:[SequelizeModule.forFeature([sales])],
  imports: [CartitemModule, PaymentModule, SpecialofferModule, Salesorder1Module],
  controllers: [],
  providers: [],
})
export class SalesModule {}
