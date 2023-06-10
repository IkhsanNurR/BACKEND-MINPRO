import { Injectable } from "@nestjs/common";
import { CreateBootcampDto } from "./dto/create-bootcamp.dto";
import { UpdateBootcampDto } from "./dto/update-bootcamp.dto";
import { batch } from "models/bootcampSchema";
import { Sequelize } from "sequelize-typescript";
import messageHelper from "src/messagehelper/message";

@Injectable()
export class BootcampService {
  constructor(private readonly sequelize: Sequelize) {}
  create(createBootcampDto: CreateBootcampDto) {
    return "This action adds a new bootcamp";
  }

  async AppBatchFindAll() {
    try {
      let result: any[] = [];
      const data = await this.sequelize.query(
        "SELECT * FROM bootcamp.appbatch"
      );
      const promises = data[0].map(async (e: any) => {
        const data2 = await this.AppBatchMembers(e.batch_id);
        const gabung: any = {
          batch_id: e.batch_id,
          batch_name: e.batch_name,
          technology: e.technology,
          batch_start_date: e.batch_start_date,
          batch_end_date: e.batch_end_date,
          trainer: e.trainer,
          batch_status: e.batch_status,
          members: data2,
        };
        console.log(gabung);
        result.push(gabung);
      });

      await Promise.all(promises);
      return result;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async AppBatchFindById(id: number) {
    try {
      let result: any[] = [];
      const data = await this.sequelize.query(
        `SELECT * FROM bootcamp.appbatch where batch_id = ${id}`
      );
      const promises = data[0].map(async (e: any) => {
        const data2 = await this.AppBatchMembers(e.batch_id);
        const gabung: any = {
          batch_id: e.batch_id,
          batch_name: e.batch_name,
          technology: e.technology,
          batch_start_date: e.batch_start_date,
          batch_end_date: e.batch_end_date,
          trainer: e.trainer,
          batch_status: e.batch_status,
          members: data2,
        };
        console.log(gabung);
        result.push(gabung);
      });

      await Promise.all(promises);
      return result;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async AppBatchMembers(id: any) {
    try {
      const data = await this.sequelize.query(
        `SELECT * FROM bootcamp.appbatchmembers where batch_id = ${id}`
      );
      return data[0];
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} bootcamp`;
  }

  update(id: number, updateBootcampDto: UpdateBootcampDto) {
    return `This action updates a #${id} bootcamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} bootcamp`;
  }
}
