import { Injectable } from "@nestjs/common";
import { CreateBootcampDto } from "./dto/create-bootcamp.dto";
import { UpdateBootcampDto } from "./dto/update-bootcamp.dto";
import {
  batch,
  program_apply,
  program_apply_progress,
} from "models/bootcampSchema";
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
      // if (result.length == 0) {
      //   throw new Error("Kosong");
      // }
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
      // if (result.length == 0) {
      //   throw new Error("Kosong");
      // }
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
      console.log(data[0]);
      return data[0];
      // return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {}
  }

  async GetTraineeById(batch: any, id: any) {
    try {
      const result = await this.sequelize.query(
        `SELECT * FROM bootcamp.appbatchmembers where batch_id = ${batch} AND trainee_id = ${id}`
      );
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
      console.log(result[0]);
      // return result[0];
      return messageHelper(result[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetProgName() {
    try {
      const data = await this.sequelize.query(
        "SELECT prog_entity_id,prog_title, prog_type from curriculum.program_entity"
      );
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong]");
      // }
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetOrangDisqualified() {
    try {
      const data = await this.sequelize.query(
        "select * from bootcamp.OrangDisqualified"
      );
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
      // if (data[0].length == 0) {
      //   throw new Error("Kosong");
      // }
      return messageHelper(data[0], 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  //post
  async PostCreateBatch(data: any) {
    try {
      //batchnya
      const batch: any[] = [data.batch];

      //trainee nya
      const data2: any = data.batchTrainees;
      const batchTrainees: any[] = data2.map((traineeId) => {
        return {
          batr_status: "selected",
          batr_access_token: "access_token",
          batr_access_grant: "0",
          batr_trainee_entity_id: traineeId,
        };
      });

      //trainernya
      const data3: any = data.trainerPrograms;
      const trainerPrograms: any[] = data3.map((trainerId) => {
        return {
          tpro_entity_id: data.batch.batch_entity_id,
          tpro_emp_entity_id: trainerId,
        };
      });

      const query = `CALL bootcamp.createBatch('${JSON.stringify(
        batch
      )}', '${JSON.stringify(batchTrainees)}', '${JSON.stringify(
        trainerPrograms
      )}')`;
      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal Create");
    }
  }

  async UpdateCandidateStatusApply(data: any) {
    //update candidate ke status filtering
    try {
      const data1 = await program_apply_progress.update(
        { parog_progress_name: data.prog_name, parog_status: "wait" },
        { where: { parog_user_entity_id: data.user } }
      );
      return messageHelper(data1, 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async UpdateCandidateStatusFiltering(data: any) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const data1 = await program_apply.update(
          {
            prap_test_score: data.test_score,
            prap_status: data.prap_status,
            prap_review: data.review,
          },
          {
            where: { prap_user_entity_id: data.user_entity_id },
            transaction: t,
          }
        );
        const data2 = await program_apply_progress.update(
          { parog_progress_name: data.progress_name },
          {
            where: { parog_user_entity_id: data.user_entity_id },
            transaction: t,
          }
        );
        return { data1, data2 };
      });
      console.log(result);
      return result;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async UpdateCandidateStatusContract(data: any) {
    try {
      const result = await program_apply_progress.update(
        { parog_progress_name: data.progress_name, parog_status: "wait" },
        {
          where: {
            parog_user_entity_id: data.user_entity_id,
          },
        }
      );
      return result;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async UpdateCandidateStatusDisqualified(data: any) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const data1 = await program_apply_progress.update(
          {
            parog_progress_name: data.progress_name,
          },
          {
            where: {
              parog_user_entity_id: data.user_entity_id,
            },
            transaction: t,
          }
        );
        const data2 = await program_apply.update(
          {
            prap_status: data.prap_status,
          },
          {
            where: {
              prap_user_entity_id: data.user_entity_id,
            },
            transaction: t,
          }
        );

        return { data1, data2 };
      });
      return messageHelper(result, 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async UpdateCandidateStatusNotResponding(data: any) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const data1 = await program_apply_progress.update(
          {
            parog_progress_name: data.progress_name,
          },
          {
            where: {
              parog_user_entity_id: data.user_entity_id,
            },
            transaction: t,
          }
        );
        const data2 = await program_apply.update(
          {
            prap_status: data.prap_status,
          },
          {
            where: {
              prap_user_entity_id: data.user_entity_id,
            },
            transaction: t,
          }
        );

        return { data1, data2 };
      });
      return messageHelper(result, 200, "Berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostSetBatchToRunning(data: any) {
    try {
      console.log(data);
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostSetBatchToClose(data: any) {
    try {
      console.log(data);
      return data;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostDeleteBatch(data: any) {
    try {
      console.log(data);
      return data;
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostEvaluationDetail(data: any) {
    try {
      // const result =
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostEditStatusEvaluation(data: any) {
    try {
      console.log(data);
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
