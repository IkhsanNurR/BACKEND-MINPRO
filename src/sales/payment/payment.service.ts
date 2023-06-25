import { Injectable } from "@nestjs/common";
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Sequelize } from "sequelize-typescript";
@Injectable()
export class PaymentService {
  constructor(private sequelize: Sequelize) {}
  // create(createPaymentDto: CreatePaymentDto) {
  //   return 'This action adds a new payment';
  // }

  async findAll(): Promise<any> {
    try {
      const viewquery = `select * from sales.viewpayment`;
      const resultview = await this.sequelize.query(viewquery);
      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const viewquery = `select * from sales.viewpayment trpa_id=${id}`;
      const resultview = await this.sequelize.query(viewquery);
      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
