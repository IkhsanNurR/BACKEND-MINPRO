import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { payment } from '../../models'; -- ini tabelnya
@Module({
  // imports:[SequelizeModule.forFeature([payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
