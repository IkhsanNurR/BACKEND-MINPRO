import { Injectable } from "@nestjs/common";
import { CreateBankDto } from "./dto/create-bank.dto";
import { UpdateBankDto } from "./dto/update-bank.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

@Injectable()
export class BankService {
  constructor(private sequelize: Sequelize) {}
  async createBank(createBankDto: CreateBankDto): Promise<any> {
    try {
      const codeCheck = await this.sequelize.query(
        "SELECT * FROM payment.bank WHERE bank_code = :bankCode",
        {
          replacements: {
            bankCode: createBankDto.bank_code,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (codeCheck.length > 0) {
        throw new Error("Bank Code already exists!");
      }
  
      const nameCheck = await this.sequelize.query(
        "SELECT * FROM payment.bank WHERE bank_name = :bankName",
        {
          replacements: {
            bankName: createBankDto.bank_name,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (nameCheck.length > 0) {
        throw new Error("Bank Name already exists!");
      }
  
      const data = `[${JSON.stringify(createBankDto)}]`;
      const result = await this.sequelize.query(
        `CALL payment.insertbank ('${data}')`
      );
  
      const success = {
        message: "Berhasil Membuat Bank",
        data: data[0],
        status: 200,
      };
      return success;
    } catch (error) {
      return {
        message: error.message || "Gagal Membuat Bank",
        status: 400,
      };
    }
  }
  

  async findAllBank() {
    try {
      const data = await this.sequelize.query("select * from payment.bank order by bank_entity_id asc");

      const success = {
        message: "sukses",
        data: data[0],
      };
      return success;
    } catch (error) {
      return error.message;
    }
  }

  async findOneBank(id: number): Promise<any> {
    try {
      const [data, _]: any[] = await this.sequelize.query(
        "SELECT * FROM payment.bank WHERE bank_entity_id = :bank_entity_id",
        {
          replacements: {
            bank_entity_id: id,
          },
          type: QueryTypes.SELECT,
        }
      );

      return data;
    } catch (error) {
      return error.message;
    }
  }

  async updateBank(id: number, updateBankDto: any): Promise<any> {
    try {
      const codeCheck = await this.sequelize.query(
        "SELECT * FROM payment.bank WHERE bank_code = :bankCode AND bank_entity_id != :id",
        {
          replacements: {
            bankCode: updateBankDto.bank_code,
            id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (codeCheck.length > 0) {
        throw new Error("Bank Code already exists!");
      }
  
      const nameCheck = await this.sequelize.query(
        "SELECT * FROM payment.bank WHERE bank_name = :bankName AND bank_entity_id != :id",
        {
          replacements: {
            bankName: updateBankDto.bank_name,
            id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (nameCheck.length > 0) {
        throw new Error("Bank Name already exists!");
      }
  
      const query = await this.sequelize.query(
        `UPDATE payment.bank SET bank_code = :bankCode, bank_name = :bankName WHERE bank_entity_id = :id`,
        {
          replacements: {
            bankCode: updateBankDto.bank_code,
            bankName: updateBankDto.bank_name,
            id: id,
          },
          type: QueryTypes.UPDATE,
        }
      );
  
      return { message: "success", status: 200 };
    } catch (error) {
      const erro = {
        message: error.message || "Failed to update Bank",
        status: 400,
      };
      return erro;
    }
  }


  async deleteBank(id: number): Promise<any> {
    try {
      const result = await this.sequelize.query(
        `DELETE FROM payment.bank WHERE bank_entity_id = ${id}`
      );

      const success = {
        data: result,
        status: 200,
        message: "Data bank berhasil dihapus",
      };
      return success;
    } catch (error) {
      const err = {
        status: 400,
        message: "Data Tidak berhasil dihapus",
      };
      return err;
    }
  }
}
