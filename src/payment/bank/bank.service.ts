import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Sequelize, } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class BankService {
  constructor(private sequelize: Sequelize) {}
  async createBank(createBankDto: CreateBankDto): Promise<any> {
    try {
      const data = `[${JSON.stringify(createBankDto)}]`
      const result = await this.sequelize.query(`CALL payment.insertbank ('${data}')`);
  
      return result
    } catch (error) {
       return error.message
    }
  }
  

  async findAllBank() {
    try {
      const data = await this.sequelize.query('select * from payment.bank ')
      const success = {
        message: 'sukses',
        data: data[0]
      }
      return success;
    } catch (error) {
      const errorm = {
        message: error.message,
        status: 400,
      };
  
      return errorm;
    }
  }

  async findOneBank(id: number): Promise<any> {
    try {
      const [data, _]:any[] = await this.sequelize.query(
        'SELECT * FROM payment.bank WHERE bank_entity_id = :bank_entity_id',
        {
          replacements: {
            bank_entity_id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
  
      if (data.length === 0) {
        return {
          status: 404,
          message: 'Data bank tidak ditemukan',
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

  async updateBank(id: number, updateBankDto: any): Promise<any> {
    try {
    const result = {
      entity_id:id,
      bank_code: updateBankDto.bank_code,
      bank_name: updateBankDto.bank_name
    }
    const data1 = `[${JSON.stringify(result)}]`;
    await this.sequelize.query(`CALL payment.updatebank ('${data1}')`);
    
    return updateBankDto
    } catch (error) {
      return error.message
    }
  }


  async deleteBank(id: number): Promise<any> {
    try {
      const result:any = await this.sequelize.query(
        'DELETE FROM payment.bank WHERE bank_entity_id = :bank_entity_id',
        {
          replacements: {
            bank_entity_id: id,
          },
        }
      );
      
      if (result[1].rowCount === 0) {
        return {
          status: 404,
          message: 'Data bank tidak ditemukan',
        };
      }
      
      return {
        status: 200,
        message: 'Data bank berhasil dihapus',
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

}
