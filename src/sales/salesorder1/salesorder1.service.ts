import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
@Injectable()
export class Salesorder1Service {
  constructor(private sequelize: Sequelize) {}
  async create(data: any) {
    try {
      const datay = `${JSON.stringify(data)}`;
      console.log(datay);
      // const resultview: any = await this.sequelize.query(`select * from sales.viewspecialoffer`);

      const result = await this.sequelize.query(
        `CALL sales.cobalahini('${datay}')`
      );
      // return `${data.data}`

      return { message: "data sales order berhasil diinput", data: result[0] };
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      const viewquery = `select * from sales.viewsalesorder`;
      const resultview = await this.sequelize.query(viewquery);

      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const viewquery = `select * from sales.viewsalesorder where sohe_id=${id}`;
      const resultview = await this.sequelize.query(viewquery);

      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  update(id: number, updateSalesorder1Dto: any) {
    return `This action updates a #${id} salesorder1`;
  }

  async remove(id: number): Promise<any> {
    try {
      const result = await this.sequelize.query(
        `call sales.deletesalesorder(${id})`
      );
      return { message: "data sales order berhasil dihapus" };
    } catch (error) {
      return error.message;
    }
  }
}
