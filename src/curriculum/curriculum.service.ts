import { Injectable } from "@nestjs/common";
import { CreateCurriculumDto } from "./dto/create-curriculum.dto";
import { UpdateCurriculumDto } from "./dto/update-curriculum.dto";
import { Sequelize } from "sequelize-typescript";
import { promises as fsPromises } from "fs";
import { InjectModel } from "@nestjs/sequelize";
import { program_entity } from "../../models/curriculumSchema";

@Injectable()
export class CurriculumService {
  constructor(private sequelize: Sequelize) {}
  async create(createProgramEntityDto: any): Promise<any> {
    try {
      console.log(createProgramEntityDto);
      const datas = {
        prog_title: createProgramEntityDto.prog_title,
        prog_headline: createProgramEntityDto.prog_headline,
        prog_type: createProgramEntityDto.prog_type,
        prog_learning_type: createProgramEntityDto.prog_learning_type,
        prog_rating: createProgramEntityDto.prog_rating,
        prog_total_trainee: createProgramEntityDto.prog_total_trainee,
        prog_image: createProgramEntityDto.prog_image,
        prog_price: createProgramEntityDto.prog_price,
        prog_language: createProgramEntityDto.prog_language,
        prog_duration: createProgramEntityDto.prog_duration,
        prog_duration_type: createProgramEntityDto.prog_duration_type,
        prog_tag_skill: createProgramEntityDto.prog_tag_skill,
        prog_city_entity_id: createProgramEntityDto.prog_city_entity_id,
        prog_cate_id: createProgramEntityDto.prog_cate_id,
        prog_create_by: createProgramEntityDto.prog_create_by,
        prog_status: createProgramEntityDto.prog_status,
        prog_min_score: createProgramEntityDto.prog_min_score,
        payment_type: createProgramEntityDto.payment_type,
        total_batch: createProgramEntityDto.total_batch,
        pred_item_learning: createProgramEntityDto.item_learning,
        pred_item_include: createProgramEntityDto.item_include,
        pred_requirement: createProgramEntityDto.requirement,
        pred_description: createProgramEntityDto.description,
        pred_target_level: createProgramEntityDto.target_level,
        prog_regis_id: createProgramEntityDto.curr_number,
      };

      console.log(datas);
      const data = `${JSON.stringify(datas)}`;
      const query = `CALL curriculum.program_procedure('[${data}]')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: "Data Sukses Di Input" };
    } catch (error) {
      return error.message;
    }
  }

  async getEmployee() {
    try {
      const data = await this.sequelize.query(
        "select * from curriculum.usersemployee"
      );

      return {
        data: data[0],
        message: "Sukses",
        status: 200,
      };
    } catch (error) {
      return error.message;
    }
  }

  async get() {
    try {
      const data = await this.sequelize.query(
        "select * from curriculum.usersemployee"
      );

      return {
        data: data[0],
        message: "Sukses",
        status: 200,
      };
    } catch (error) {
      return error.message;
    }
  }

  async findAll(search: any, filter: any): Promise<any> {
    try {
      let result = `SELECT * FROM curriculum.program_view`;
      //SEARCH
      if (search) {
        result += `WHERE prog_title ILIKE '%${search}' OR prog_headline ILIKE '%${search}'`;
      } else {
        result += ` WHERE 1=1`;
      }

      if (filter) {
        result += ` AND prog_learning_type = '${filter}'`;
      }
      // result += ` LIMIT ${+pagination.limit} OFFSET ${+pagination.offset}`
      const query = await this.sequelize.query(result);
      return query;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const data = await program_entity.findByPk(id);
      if (!data) {
        throw new Error("Not Found");
      }
      return data;
    } catch (error) {
      return error.message;
    }
  }
  // async category() : Promise<any>{
  //   try {
  //     let result = `SELECT * FROM curriculum.master_view`
  //     const query = await this.sequelize.query(result)
  //     return query
  //   } catch (error) {
  //     return error.message
  //   }
  // }

  async findCurrRegNumber(): Promise<any> {
    try {
      const currentNumber = await program_entity.findOne({
        attributes: [
          [
            Sequelize.literal("LPAD((prog_entity_id + 1)::text, 4, '0')"),
            "formatted_prog_entity_id",
          ],
        ],
        order: [["prog_entity_id", "DESC"]],
        limit: 1,
      });
      const formattedProgEntityId = currentNumber
        ? currentNumber.get("formatted_prog_entity_id")
        : null;
      const tanggalPosting = new Date();
      const formattedDate = tanggalPosting
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const result = `CURR#${formattedDate}#${formattedProgEntityId}`;
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async update(
    id: number,
    updateCurriculumDto: any,
    file: Express.Multer.File
  ) {
    try {
      const program = await program_entity.findByPk(+id);

      let image = program.prog_image;

      // if(file){
      //   fsPromises.unlink('./public/curiculum/' + image)
      // }

      const datas = {
        prog_entity_id: id,
        prog_title: updateCurriculumDto.prog_title,
        prog_headline: updateCurriculumDto.prog_headline,
        prog_type: updateCurriculumDto.prog_type,
        prog_learning_type: updateCurriculumDto.prog_learning_type,
        prog_rating: updateCurriculumDto.prog_rating,
        prog_total_trainee: updateCurriculumDto.prog_total_trainee,
        prog_image: updateCurriculumDto.prog_image,
        prog_price: updateCurriculumDto.prog_price,
        prog_language: updateCurriculumDto.prog_language,
        prog_duration: updateCurriculumDto.prog_duration,
        prog_duration_type: updateCurriculumDto.prog_duration_type,
        prog_tag_skill: updateCurriculumDto.prog_tag_skill,
        prog_city_entity_id: updateCurriculumDto.prog_city_entity_id,
        prog_cate_id: updateCurriculumDto.prog_cate_id,
        prog_create_by: updateCurriculumDto.prog_create_by,
        prog_status: updateCurriculumDto.prog_status,
        prog_regis_id: updateCurriculumDto.prog_regis_id,
        payment_type: updateCurriculumDto.payment_type,
        total_batch: updateCurriculumDto.total_batch,
        pred_item_learning: updateCurriculumDto.item_learning,
        pred_item_include: updateCurriculumDto.item_include,
        pred_requirement: updateCurriculumDto.requirement,
        pred_description: updateCurriculumDto.description,
        pred_target_level: updateCurriculumDto.target_level,
      };
      console.log("datas", datas);
      const param = `${JSON.stringify(datas)}`;
      const query = `CALL curriculum.update_program_procedure ('${param}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: "Data Sukses Di Update" };
    } catch (error) {
      return error.message;
    }
  }

  async createSectionsDetail(
    id: number,
    CreateCurriculumDto: any
  ): Promise<any> {
    try {
      console.log(CreateCurriculumDto);
      const data = `[${JSON.stringify(CreateCurriculumDto)}]`;
      const query = `CALL curriculum.add_section_detail('${id}','${data}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: "Data Sukses Di Input" };
    } catch (error) {
      return error.message;
    }
  }

  async createSections(CreateCurriculumDto: any): Promise<any> {
    try {
      const datas = {
        sect_title: CreateCurriculumDto.title,
        sect_decription: CreateCurriculumDto.decription,
      };
      console.log(CreateCurriculumDto);
      const data = `[${JSON.stringify(CreateCurriculumDto)}]`;
      const query = `CALL curriculum.add_section('${data}')`;
      const result = await this.sequelize.query(query);
      return { data: result, messages: "Data Sukses Di Input" };
    } catch (error) {
      return error.message;
    }
  }
  async MergeSection() {
    try {
      const section = await this.sequelize
        .query(`SELECT * FROM curriculum.sections WHERE sect_prog_entity_id = (SELECT MAX(prog_entity_id) FROM curriculum.program_entity);
      `);
      const sectionDetail = await this.sequelize.query(`SELECT *
      FROM curriculum.section_detail
      JOIN curriculum.section_detail_material
      ON section_detail.secd_id = section_detail_material.sedm_secd_id;
      `);

      const mergedData = section[0].map((sections: any) => {
        const sectDet = sectionDetail[0].filter(
          (sectDetail: any) => sectDetail.secd_sect_id === sections.sect_id
        );
        return {
          ...sections,
          sectionDetail: sectDet,
        };
      });

      return { mergedData };
    } catch (error) {}
  }

  async viewSection() {
    try {
      const result = await this.sequelize
        .query(`SELECT * FROM curriculum.sections WHERE sect_prog_entity_id = (SELECT MAX(prog_entity_id) FROM curriculum.program_entity);
      `);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async viewSectionDetail() {
    try {
      const result = await this.sequelize.query(`SELECT *
      FROM curriculum.section_detail
      JOIN curriculum.section_detail_material
      ON section_detail.secd_id = section_detail_material.sedm_secd_id;
      `);
      return result;
    } catch (error) {
      return error.message;
    }
  }
  async findAllMaster() {
    try {
      const query = `SELECT * FROM master.category`;
      const result = await this.sequelize.query(query);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} curriculum`;
  }
}
