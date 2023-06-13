import { Injectable } from "@nestjs/common";
import { CreateBootcampDto } from "./dto/create-bootcamp.dto";
import { UpdateBootcampDto } from "./dto/update-bootcamp.dto";
import { batch, program_apply_progress } from "models/bootcampSchema";
import { Sequelize } from "sequelize-typescript";
import messageHelper from "src/messagehelper/message";
import { where } from "sequelize";

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
        const data2 = await this.GetAppBatchMembers(e.batch_id);
        const gabung: any = {
          batch_id: e.batch_id,
          batch_name: e.batch_name,
          batch_type: e.batch_type,
          technology: e.technology,
          batch_start_date: e.batch_start_date,
          batch_end_date: e.batch_end_date,
          batch_reason: e.batch_reason,
          batch_description: e.batch_description,
          batch_entity_id: e.batch_entity_id,
          trainer: e.trainer,
          batch_status: e.batch_status,
          members: data2,
        };
        result.push(gabung);
      });

      await Promise.all(promises);
      if (result.length == 0) {
        throw new Error("Kosong");
      }
      return messageHelper(result, 200, "Berhasil");
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
        const data2 = await this.GetAppBatchMembers(e.batch_id);
        const gabung: any = {
          batch_id: e.batch_id,
          batch_name: e.batch_name,
          batch_type: e.batch_type,
          technology: e.technology,
          batch_start_date: e.batch_start_date,
          batch_end_date: e.batch_end_date,
          batch_reason: e.batch_reason,
          batch_description: e.batch_description,
          batch_entity_id: e.batch_entity_id,
          trainer: e.trainer,
          batch_status: e.batch_status,
          members: data2,
        };
        result.push(gabung);
      });

      await Promise.all(promises);
      if (result.length == 0) {
        throw new Error("Kosong");
      }
      return messageHelper(result, 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetAppBatchMembers(id: any) {
    try {
      const data = await this.sequelize.query(
        `SELECT * FROM bootcamp.appbatchmembers where batch_id = ${id}`
      );
      if (data[0].length == 0) {
        throw new Error("Kosong");
      }
      console.log(data[0]);
      return data[0];
      // return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {}
  }

  async GetProgName() {
    try {
      const data = await this.sequelize.query(
        "SELECT prog_entity_id,prog_title, prog_type from curriculum.program_entity"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal!");
    }
  }

  async GetTrainerName() {
    try {
      const data = await this.sequelize.query(
        "SELECT * from bootcamp.view_trainer"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong]");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal!");
    }
  }

  async GetOrangCreateUpdateBatch() {
    try {
      const data = await this.sequelize.query(
        "SELECT * FROM bootcamp.view_orang_create_batch"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetOrangApply() {
    try {
      const data = await this.sequelize.query(
        "SELECT * FROM bootcamp.OrangApply"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetOrangFiltering() {
    try {
      const data = await this.sequelize.query(
        "SELECT * FROM bootcamp.orangfiltering"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "GAGAL");
    }
  }

  async GetOrangContract() {
    try {
      const data = await this.sequelize.query(
        "SELECT * FROM bootcamp.orangcontract"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong]");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetOrangNotResponding() {
    try {
      const data = await this.sequelize.query(
        "SELECT * FROM bootcamp.orangnotresponding"
      );
      if (data[0].length == 0) {
        throw new Error("Kosong]");
      }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  //post
  async PostCreateBatch(data: any) {
    try {
      //batchnya
      const data1: any[] = [data.batch];

      //trainee nya
      const batchTrainees: any = data.batchTrainees;
      const data2: any[] = batchTrainees.map((traineeId) => {
        return {
          batr_status: "selected",
          batr_access_token: "access_token",
          batr_access_grant: "0",
          batr_trainee_entity_id: traineeId,
        };
      });

      //trainernya
      const trainerPrograms: any = data.trainerPrograms;
      const data3: any[] = trainerPrograms.map((trainerId) => {
        return {
          tpro_entity_id: data.batch.batch_entity_id,
          tpro_emp_entity_id: trainerId,
        };
      });
      console.log(data1, data2, data3);
      return { data1, data2, data3 };
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal Create");
    }
  }

  async UpdateCandidateStatusApply(data: any) {
    //update candidate ke status filtering
    try {
      const result = await program_apply_progress.update(
        { parog_progress_name: data.prog_name, parog_status: "ready test" },
        { where: { parog_user_entity_id: data.user } }
      );
      return data;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
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
