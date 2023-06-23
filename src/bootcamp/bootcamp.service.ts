import { Injectable } from "@nestjs/common";
import {
  batch,
  batch_trainee,
  batch_trainee_evaluation,
  program_apply,
  program_apply_progress,
  talents,
} from "models/bootcampSchema";
import { users, users_education, users_media } from "models/usersSchema";
import { Sequelize } from "sequelize-typescript";
import messageHelper from "src/messagehelper/message";
import { v4 as uuidv4 } from "uuid";
import * as fse from "fs-extra";

@Injectable()
export class BootcampService {
  constructor(private readonly sequelize: Sequelize) {}

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

  async GetBootcampIndex() {
    try {
      const query = `SELECT * FROM curriculum.program_entity`;
      const result = await this.sequelize.query(query);
      return messageHelper(result[0], 200, "berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async GetTalents() {
    try {
      const result = await talents.findAll();
      return messageHelper(result, 200, "Berhasi");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  //post
  async ApplyBatch(images: Express.Multer.File[], data: any) {
    try {
      const old_photo = await users.findOne({ where: { user_entity_id: 26 } });
      const old_media = await users_media.findOne({
        where: { usme_entity_id: 26 },
      });
      const cvFile = images.find((file) => file.fieldname === "cv");
      const cvType = cvFile.mimetype.split("/");
      const fotoFile = images.find((file) => file.fieldname === "foto");
      const fotoType = fotoFile.mimetype.split("/");
      const apply = [
        {
          prap_user_entity_id: data.user_entity_id,
          prap_prog_entity_id: data.prog_entity_id,
          prap_status: "wait",
        },
      ];
      const apply_prog = [
        {
          parog_user_entity_id: data.user_entity_id,
          parog_prog_entity_id: data.prog_entity_id,
          parog_progress_name: "apply",
          parog_status: "open",
        },
      ];
      const result = await this.sequelize.transaction(async (t) => {
        const data1 = await users.update(
          {
            user_first_name: data.first_name,
            user_last_name: data.last_name,
            user_birth_date: data.birth_date,
            user_photo: fotoFile.filename,
          },
          {
            where: { user_entity_id: data.user_entity_id },
            transaction: t,
          }
        );
        const data2 = await users_education.update(
          {
            usdu_school: data.usdu_school,
            usdu_degree: data.usdu_degree,
            usdu_field_study: data.usdu_field,
          },
          {
            where: { usdu_entity_id: data.user_entity_id },
            transaction: t,
          }
        );
        const data3 = await users_media.update(
          {
            usme_filename: cvFile.filename,
            usme_filetype: cvType[1],
            usme_filesize: cvFile.size,
          },
          { where: { usme_entity_id: data.user_entity_id } }
        );
        const query = `CALL bootcamp.createProgramApplyProgress(:prog_entity ,:prap_apply, :prog_apply_progress)`;
        const replacements = {
          prog_entity: data.prog_entity_id,
          prap_apply: JSON.stringify(apply),
          prog_apply_progress: JSON.stringify(apply_prog),
        };

        const queryResult = await this.sequelize.query(query, {
          replacements,
          transaction: t,
        });

        return { data1, data2, data3, queryResult };
      });
      if (old_photo.user_photo) {
        const imagePath = "./public/users/" + old_photo.user_photo;
        const exist = fse.existsSync(imagePath);
        if (fse.existsSync(imagePath)) {
          fse.remove(imagePath);
        }
      }
      if (old_media.usme_filename) {
        const imagePath = "./public/users/" + old_media.usme_filename;
        const exist = fse.existsSync(imagePath);
        if (fse.existsSync(imagePath)) {
          fse.remove(imagePath);
        }
      }
      return messageHelper("yeay", 201, "berhasil");
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostCreateBatch(data: any) {
    try {
      //batchnya
      const batch: any[] = [data.batch];

      //trainee nya
      const data2: any = data.batchTrainees;
      const batchTrainees: any[] = data2.map((traineeId) => {
        return {
          batr_status: "selected",
          // batr_access_token: "access_token",
          // batr_access_grant: "0",
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
      return messageHelper(
        "Sukses",
        201,
        `Berhasil Create Batch ${data.batch.batch_name}`
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal Create");
    }
  }

  async PostEditBatch(data: any) {
    try {
      const batch = data.batch;
      const batch_trainees = data.batchTrainees;
      const trainerPrograms = data.trainerPrograms;
      const traineeBefore = await batch_trainee.findAll({
        where: { batr_batch_id: batch.batch_id },
      });
      const oldIds = traineeBefore.map((id) => id.batr_trainee_entity_id);
      const addedIds = batch_trainees.filter((id) => !oldIds.includes(id));
      const deletedIds = oldIds.filter((id) => !batch_trainees.includes(id));
      const added = addedIds.map((id) => ({
        batr_status: "selected",
        batr_trainee_entity_id: id,
      }));
      const deleted = deletedIds.map((id) => ({
        batr_trainee_entity_id: id,
      }));
      const trainernya = trainerPrograms.map((id) => ({
        tpro_entity_id: batch.batch_entity_id,
        tpro_emp_entity_id: id,
      }));
      const addedTrainee = JSON.stringify(added);
      const deletedTrainee = JSON.stringify(deleted);
      const trainer = JSON.stringify(trainernya);
      console.log(addedTrainee, deletedTrainee, trainer);
      const query = `CALL bootcamp.update_batch(:batch_id, :entity_id, :batch_name, :batch_desc, :start_date, :end_date, :batch_type, :pic_id, :addedTrainee, :deletedTrainee, :trainer)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          batch_id: batch.batch_id,
          entity_id: batch.batch_entity_id,
          batch_name: batch.batch_name,
          batch_desc: batch.batch_description,
          start_date: batch.batch_start_date,
          end_date: batch.batch_end_date,
          batch_type: batch.batch_type,
          pic_id: batch.batch_pic_id,
          addedTrainee: addedTrainee,
          deletedTrainee: deletedTrainee,
          trainer: trainer,
        },
      });
      return messageHelper("Berhasil Update", 201, `${batch.batch_name}`);
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal Update");
    }
  }

  async PostSetBatchToRunning(data: any) {
    try {
      const batch_id = parseInt(data.batch_id);
      const batch_status = data.status;
      const batch_name = data.batch_name;
      const batch_entity_id = data.batch_entity_id;
      const member = data.member;
      const tanggal = new Date();
      const tanggalrunning = tanggal.toISOString().slice(0, 10);
      const batchTrainees: any[] = member.map((traineeId) => {
        return {
          batr_access_token: uuidv4(),
          batr_access_grant: "1",
          batr_trainee_entity_id: +traineeId,
        };
      });
      const trainee = JSON.stringify(batchTrainees);
      const query = `CALL bootcamp.setbatchrunning(:batch_id, :batch_status, :batch_entity_id, :start_date, :trainee)`;
      console.log(query);
      const result = await this.sequelize.query(query, {
        replacements: {
          batch_id: batch_id,
          batch_status: batch_status,
          batch_entity_id: batch_entity_id,
          start_date: tanggalrunning,
          trainee: trainee,
        },
      });
      return messageHelper(
        "Sukses!",
        201,
        `Berhasil Running Batch dengan nama ${batch_name}`
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  //masih kurang
  async PostSetBatchToClose(data: any) {
    try {
      const batch_id = data.batch_id;
      const batch_status = data.batch_status;
      const tanggal = new Date();
      const batch_name = data.batch_name;
      const tanggalClose = tanggal.toISOString().slice(0, 10);
      const batchTrainees: any[] = data.batchTrainees.map((datanya) => {
        return {
          talent_fullname: datanya.talent_fullname,
          talent_user_entity_id: datanya.talent_user_entity_id,
          talent_technology: datanya.talent_technology,
          talent_start_date: datanya.talent_start_date,
          talent_end_date: datanya.talent_end_date,
          talent_trainer: datanya.talent_trainer,
          talent_skill: datanya.talent_skill ? datanya.talent_skill : "",
          talent_status: "idle",
        };
      });
      const membernya = JSON.stringify(batchTrainees);
      const query = `CALL bootcamp.closeBatch(:batch_id, :batch_status, :tanggal_end, :trainer)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          batch_id: batch_id,
          batch_status: batch_status,
          tanggal_end: tanggalClose,
          trainer: membernya,
        },
      });
      console.log("datanya 2", batch_id, batch_status, membernya);
      return messageHelper(
        "Sukses",
        201,
        `Berhasil Closed Batch dengan nama ${batch_name}`
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostDeleteBatch(data: any) {
    try {
      const batch_id = data.batch_id;
      const batch_status = "cancelled";
      const batch_reason = data.batch_reason;
      const batch_name = data.batch_name;
      const batchTrainees: any[] = data.member.map((idnya) => {
        return {
          batr_trainee_entity_id: idnya,
        };
      });
      const membernya = JSON.stringify(batchTrainees);
      const query = `CALL bootcamp.deleteBatch(:batch_id, :batch_status, :batch_reason, :trainee)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          batch_id: batch_id,
          batch_status: batch_status,
          trainee: membernya,
        },
      });
      console.log("idnya", batch_id);
      console.log("orangnya", membernya);
      console.log("statusnya", batch_status);
      console.log("reasonnya", batch_reason);
      return messageHelper(
        "Sukses!",
        201,
        `Berhasil delete Batch ${batch_name}`
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostExtendBatch(data: any) {
    try {
      console.log(data);
      const result = await batch.update(
        {
          batch_end_date: data.batch_end_date,
          batch_status: "extend",
          batch_reason: data.batch_reason,
        },
        { where: { batch_id: +data.batch_id } }
      );
      return messageHelper(
        "Sukses!",
        201,
        `Berhasil extend ${data.batch_name} ke ${data.formattedDate}`
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostPendingBatch(data: any) {
    try {
      console.log(data);
      const result = await batch.update(
        {
          batch_start_date: data.batch_start_date,
          batch_end_date: data.batch_end_date,
          batch_status: data.batch_status,
          batch_reason: data.batch_reason,
        },
        { where: { batch_id: +data.batch_id } }
      );
      return messageHelper(
        "Sukses!",
        201,
        `Berhasil Pending Batch ${data.batch_name} ke ${data.formatted_start} - ${data.formatted_end} `
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostEvaluationDetail(data: any) {
    try {
      const fullname = data.fullname;
      const member = data.evaluation;
      const batchTrainees = JSON.stringify(member);
      const query = `CALL bootcamp.createEvaluation(:total_score, :batch_id, :trainee_id, :batr_status, :trainee)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          total_score: +data.batr_total_score,
          batch_id: +data.batr_batch_id,
          trainee_id: +data.batr_trainee_entity_id,
          batr_status: data.status,
          trainee: batchTrainees,
        },
      });
      // const datanya: any = {
      //   batr_total_score: 25,
      //   batch_id: 5,
      //   trainee_id: 26,
      //   batr_status: "failed",
      //   evaluation: [
      //     { technical: { fundamental: 1, oop: 1, database: 1 } },
      //     { softskill: { communication: 1, teamwork: 1, selfLearning: 1 } },
      //     { presentation: { gerak: 1, nada: 1, pembawaan: 1 } },
      //   ],
      // };
      // const result = [];
      // data.evaluation.forEach((item) => {
      //   const category = Object.keys(item)[0];
      //   const skills = item[category];

      //   if (category === "technical") {
      //     Object.entries(skills).forEach(([section, value]) => {
      //       const entry = {
      //         btev_type: "hardskill",
      //         btev_section: "technical",
      //         btev_skill: section,
      //         btev_skor: value,
      //       };
      //       result.push(entry);
      //     });
      //   } else {
      //     Object.entries(skills).forEach(([section, value]) => {
      //       const entry = {
      //         btev_type: "softskill",
      //         btev_section: category,
      //         btev_skill: section,
      //         btev_skor: value,
      //       };
      //       result.push(entry);
      //     });
      //   }
      // });
      // console.log(result);
      // console.log(data.evaluation);
      // console.log(data.evaluation[0].technical);
      return messageHelper("Sukses", 201, `Berhasil evaluasi ${fullname}`);
    } catch (error) {
      console.log(error.message);
      return messageHelper(error.message, 400, "Gagal");
    }
  }

  async PostEditStatusEvaluation(data: any) {
    try {
      console.log(data);
      const result = await batch_trainee.update(
        {
          batr_status: data.status,
          batr_certificated: "0",
          batr_access_grant: "0",
          batr_access_token: "",
          batr_review: data.review,
        },
        { where: { batr_trainee_entity_id: +data.user_entity_id } }
      );
      return messageHelper(
        "Sukses",
        201,
        `status ${data.fullname} diubah menjadi resign!`
      );
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal");
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

  findOne(id: number) {
    return `This action returns a #${id} bootcamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} bootcamp`;
  }
}
