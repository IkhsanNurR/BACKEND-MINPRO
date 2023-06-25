import { Injectable } from "@nestjs/common";
// import { special_offer, special_offer_programs } from 'models/sales'
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SpecialofferService {
  constructor(private sequelize: Sequelize) {}

  async create(data: any): Promise<any> {
    try {
      const ambilData = `${JSON.stringify(data)}`;
      console.log(data);

      const result = await this.sequelize.query(
        `call sales.insert_special_offer('${ambilData}')`
      );
      // console.log(result);

      return { message: "success", data: result[0] };
    } catch (error) {
      return error.message;
    }
  }

  async findAll(): Promise<any> {
    try {
      const viewquery = `select * from sales.viewspecialoffer`;
      const resultview = await this.sequelize.query(viewquery);

      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const viewquery = `select * from sales.viewspecialoffer where spof_id=${id}`;
      const resultview = await this.sequelize.query(viewquery);

      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, updateSpecialofferDto: any) {
    try {
      const newData = {
        spof_id: id,
        spof_description: updateSpecialofferDto.spof_description,
        spof_discount: updateSpecialofferDto.spof_discount,
        spof_type: updateSpecialofferDto.spof_type,
        spof_start_date: updateSpecialofferDto.spof_start_date,
        spof_end_date: updateSpecialofferDto.spof_end_date,
        spof_min_qty: updateSpecialofferDto.spof_min_qty,
        spof_max_qty: updateSpecialofferDto.spof_max_qty,
        soco_status: updateSpecialofferDto.soco_status,
      };
      const dataUpdate = `[${JSON.stringify(newData)}]`;

      const result = await this.sequelize.query(
        `call sales.updatespecialoffer('${dataUpdate}')`
      );
      return { message: "data berhasil diupdate", data: result[0] };
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number): Promise<any> {
    try {
      // const idBody = await special_offer.findByPk(id)
      // if (!idBody) throw new Error('special offer tidak ditemukan')
      const result = await this.sequelize.query(
        `call sales.deletespecialoffer(${id})`
      );
      return { message: "data special offer sudah dihapus" };
    } catch (error) {
      return error.message;
    }
  }
}
