import { Injectable } from "@nestjs/common";
import { CreateFintechDto } from "./dto/create-fintech.dto";
import { UpdateFintechDto } from "./dto/update-fintech.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

@Injectable()
export class FintechService {
  constructor(private sequelize: Sequelize) {}
  async createFintech(createFintechDto: CreateFintechDto): Promise<any> {
    try {
      const codeCheck = await this.sequelize.query(
        "SELECT * FROM payment.fintech WHERE fint_code = :fintCode",
        {
          replacements: {
            fintCode: createFintechDto.fint_code,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (codeCheck.length > 0) {
        throw new Error("Fintech Code already exists!");
      }
  
      const nameCheck = await this.sequelize.query(
        "SELECT * FROM payment.fintech WHERE fint_name = :fintName",
        {
          replacements: {
            fintName: createFintechDto.fint_name,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (nameCheck.length > 0) {
        throw new Error("Fintech Name already exists!");
      }
  
      const data = `[${JSON.stringify(createFintechDto)}]`;
      const result = await this.sequelize.query(
        `CALL payment.insertfintech ('${data}')`
      );
  
      const success = {
        message: "Berhasil Membuat Fintech",
        data: data[0],
        status: 200,
      };
      return success;
    } catch (error) {
      return {
        message: error.message || "Gagal Membuat Fintech",
        status: 400,
      };
    }
  }
  

  async findAllFintech() {
    try {
      const data = await this.sequelize.query("select * from payment.fintech order by fint_entity_id asc ");
      const success = {
        message: "sukses",
        data: data[0],
      };
      return success;
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async findOneFintech(id: number): Promise<any> {
    try {
      const [data, _]: any[] = await this.sequelize.query(
        "SELECT * FROM payment.fintech WHERE fint_entity_id = :fint_entity_id",
        {
          replacements: {
            fint_entity_id: id,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (data.length === 0) {
        return {
          status: 404,
          message: "Data bank tidak ditemukan",
        };
      }

      return data;
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async updateFintech(id: number, UpdateFintechDto: any): Promise<any> {
    try {
      const codeCheck = await this.sequelize.query(
        "SELECT * FROM payment.fintech WHERE fint_code = :fint_code AND fint_entity_id != :id",
        {
          replacements: {
            fint_code: UpdateFintechDto.fint_code,
            id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (codeCheck.length > 0) {
        throw new Error("Fintech Code already exists!");
      }
  
      const nameCheck = await this.sequelize.query(
        "SELECT * FROM payment.fintech WHERE fint_name = :fint_name AND fint_entity_id != :id",
        {
          replacements: {
            fint_name: UpdateFintechDto.fint_name,
            id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (nameCheck.length > 0) {
        throw new Error("Fintech Name already exists!");
      }
  
      const query = await this.sequelize.query(
        `UPDATE payment.fintech SET fint_code = :fint_code, fint_name = :fint_name WHERE fint_entity_id = :id`,
        {
          replacements: {
            fint_code: UpdateFintechDto.fint_code,
            fint_name: UpdateFintechDto.fint_name,
            id: id,
          },
          type: QueryTypes.UPDATE,
        }
      );
  
      return { message: "success", status: 200 };
    } catch (error) {
      const erro = {
        message: error.message || "Failed to update Fintech",
        status: 400,
      };
      return erro;
    }
  }


  async deleteFintech(id: number): Promise<any> {
    try {
      const result: any = await this.sequelize.query(
        `DELETE FROM payment.fintech WHERE fint_entity_id = ${id}`
      );

      if (result[1].rowCount === 0) {
        return {
          status: 404,
          message: "Data Fintech tidak ditemukan",
        };
      }

      return {
        status: 200,
        message: "Data Fintech berhasil dihapus",
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
