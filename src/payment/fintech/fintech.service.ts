import { Injectable } from '@nestjs/common';
import { CreateFintechDto } from './dto/create-fintech.dto';
import { UpdateFintechDto } from './dto/update-fintech.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class FintechService {
  constructor(private sequelize: Sequelize) {}
  async createFintech(CreateFintechDto: CreateFintechDto): Promise<any> {
    try {
    const data = `[${JSON.stringify(CreateFintechDto)}]`
    const result = await this.sequelize.query(`CALL payment.insertfintech ('${data}')`)

      return result
    } catch (error) {
      return error.message
  }
}

  async findAllFintech() {
    try {
      const data = await this.sequelize.query('select * from payment.fintech ');
      const success = {
        message: 'sukses',
        data: data[0],
      };
      return success;
    } catch (error) {
      const errorm = {
        message: error.message,
        status: 400,
      };

      return errorm;
    }
  }

  async findOneFintech(id: number): Promise<any> {
    try {
      const [data, _]: any[] = await this.sequelize.query(
        'SELECT * FROM payment.fintech WHERE fint_entity_id = :fint_entity_id',
        {
          replacements: {
            fint_entity_id: id,
          },
          type: QueryTypes.SELECT,
        },
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

  async updateFintech(id: number,UpdateFintechDto: UpdateFintechDto): Promise<any> {
    try {
      const result = {
        entity_id:id,
        fint_code: UpdateFintechDto.fint_code,
        fint_name: UpdateFintechDto.fint_name
      }

      const data1 = `[${JSON.stringify(result)}]`;
    await this.sequelize.query(`CALL payment.updatefintech ('${data1}')`);


    return {
      message: 'succes'
    }
    } catch (error) {
      return error.message
    }
  }


  async deleteFintech(id: number): Promise<any> {
    try {
      const result: any = await this.sequelize.query(
        'DELETE FROM payment.fintech WHERE fint_entity_id = :fint_entity_id',
        {
          replacements: {
            fint_entity_id: id,
          },
        },
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
