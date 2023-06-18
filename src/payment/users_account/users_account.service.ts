import { Injectable } from '@nestjs/common';
import { CreateUsersAccountDto } from './dto/create-users_account.dto';
import { UpdateUsersAccountDto } from './dto/update-users_account.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { validate } from 'class-validator';

@Injectable()
export class UsersAccountService {
  constructor(private sequelize: Sequelize) {}

  async createUserAccountWFintech(createUsersAccountDto: CreateUsersAccountDto) {
    try {
      const errors = await validate(createUsersAccountDto);
      if (errors.length > 0) {
        throw new Error('Validation failed');
      }
  
      const {
        usac_user_entity_id,
        usac_fint_entity_id,
        usac_account_number,
        usac_saldo,
        usac_type,
        usac_status
      } = createUsersAccountDto;
  
      const [result]: { count: number }[] = await this.sequelize.query(`
        SELECT COUNT(*) AS count
        FROM payment.users_account
        WHERE usac_user_entity_id = :usac_user_entity_id AND usac_type = 'fintech'
      `, {
        replacements: { usac_user_entity_id },
        type: QueryTypes.SELECT
      });
  
      if (result && result.count >= 1) {
        throw new Error('User already has a fintech account');
      }
  
      const createAccountResult = await this.sequelize.query(`
        CALL payment.createUserAccountWEntity(
          'fintech',
          :usac_fint_entity_id,
          :usac_user_entity_id,
          :usac_account_number,
          :usac_saldo,
          :usac_type,
          :usac_status
        )
      `, {
        replacements: {
          usac_fint_entity_id,
          usac_user_entity_id,
          usac_account_number,
          usac_saldo,
          usac_type,
          usac_status
        },
        type: QueryTypes.RAW
      });
  
      return createAccountResult;
    } catch (error) {
      return error.message;
    }
  }
  


  // async createUserAccountWFintech(CreateUsersAccountDto: CreateUsersAccountDto): Promise<any> {
  //   try {
  //     const result = await this.sequelize.query(
  //       `
  //       INSERT INTO payment.users_account
  //         (usac_fint_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
  //       VALUES
  //         (:usac_fint_entity_id, :usac_user_entity_id, :usac_account_number, :usac_saldo, :usac_type, :usac_status)
  //       RETURNING *
  //       `,
  //       {
  //         replacements: {
  //           usac_fint_entity_id: CreateUsersAccountDto.usac_fint_entity_id,
  //           usac_user_entity_id: CreateUsersAccountDto.usac_user_entity_id,
  //           usac_account_number: CreateUsersAccountDto.usac_account_number,
  //           usac_saldo: CreateUsersAccountDto.usac_saldo,
  //           usac_type: CreateUsersAccountDto.usac_type,
  //           usac_status: CreateUsersAccountDto.usac_status,
  //         },
  //         type: QueryTypes.INSERT,
  //       },
  //     );
  
  //     const success = {
  //       message: 'Sukses membuat Saldo Akun',
  //       status: 200,
  //       data: result[0][0], // Return the first row of the result set
  //     };
  
  //     return success;
  //   } catch (error) {
  //     const errorm = {
  //       message: error.message,
  //       status: 400,
  //     };
  
  //     return errorm;
  //   }
  // }


  async createUserAccountWBank(createUsersAccountDto: CreateUsersAccountDto) {
    try {
      const errors = await validate(createUsersAccountDto);
      if (errors.length > 0) {
        throw new Error('Validation failed');
      }
  
      const {
        usac_user_entity_id,
        usac_bank_entity_id,
        usac_account_number,
        usac_saldo,
        usac_type,
        usac_status
      } = createUsersAccountDto;
  
      const [result]: { count: number }[] = await this.sequelize.query(`
        SELECT COUNT(*) AS count
        FROM payment.users_account
        WHERE usac_user_entity_id = :usac_user_entity_id AND usac_type = 'bank'
      `, {
        replacements: { usac_user_entity_id },
        type: QueryTypes.SELECT
      });
  
      if (result && result.count >= 1) {
        throw new Error('User already has a bank account');
      }
  
      const createAccountResult = await this.sequelize.query(`
        CALL payment.createUserAccountWEntity(
          'bank',
          :usac_bank_entity_id,
          :usac_user_entity_id,
          :usac_account_number,
          :usac_saldo,
          :usac_type,
          :usac_status
        )
      `, {
        replacements: {
          usac_bank_entity_id,
          usac_user_entity_id,
          usac_account_number,
          usac_saldo,
          usac_type,
          usac_status
        },
        type: QueryTypes.RAW
      });
  
      return createAccountResult;
    } catch (error) {
      return error.message;
    }
  }
  


  async findAllUserAccount() {
    try {
      const data = await this.sequelize.query('select * from payment.users_account');
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


  async findOneUserAccount(id: number): Promise<any> {
    try {
      const [data, _]: any[] = await this.sequelize.query(
        'SELECT * FROM payment.users_account WHERE usac_user_entity_id = :usac_user_entity_id',
        {
          replacements: {
            usac_user_entity_id: id,
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


  async updateUserAccountWBank(id: number, updateUsersAccountDto: UpdateUsersAccountDto): Promise<any> {
    try {
      const [result, _] = await this.sequelize.query(
        `
        UPDATE payment.users_account
        SET
          usac_bank_entity_id = :usac_bank_entity_id,
          usac_account_number = :usac_account_number,
          usac_saldo = :usac_saldo,
          usac_type = :usac_type,
          usac_start_date = :usac_start_date,
          usac_end_date = :usac_end_date,
          usac_status = :usac_status
        WHERE
          usac_user_entity_id = :id
        `,
        {
          replacements: {
            id: id,
            usac_bank_entity_id: updateUsersAccountDto.usac_bank_entity_id,
            usac_user_entity_id: updateUsersAccountDto.usac_user_entity_id,
            usac_account_number: updateUsersAccountDto.usac_account_number,
            usac_saldo: updateUsersAccountDto.usac_saldo,
            usac_type: updateUsersAccountDto.usac_type,
            usac_status: updateUsersAccountDto.usac_status,
          },
        },
      );
  
      if (result[1] === 0) {
        return {
          status: 404,
          message: 'Data akun pengguna tidak ditemukan',
        };
      }
  
      const success = {
        message: 'Sukses mengupdate akun pengguna',
        status: 200,
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


  async updateUserAccountWFintech(id: number, updateUsersAccountDto: UpdateUsersAccountDto): Promise<any> {
    try {
      const query = `
        UPDATE payment.users_account
        SET
          usac_bank_entity_id = (SELECT fint_entity_id FROM payment.fintech WHERE fint_entity_id = :fint_entity_id),,
          usac_account_number = :usac_account_number,
          usac_saldo = :usac_saldo,
          usac_type = :usac_type,
          usac_status = :usac_status
        WHERE
          usac_user_entity_id = :usac_user_entity_id
      `;
  
      const replacements: any = {
        usac_fint_entity_id: updateUsersAccountDto.usac_fint_entity_id,
        usac_user_entity_id: id,
        usac_account_number: updateUsersAccountDto.usac_account_number,
        usac_saldo: updateUsersAccountDto.usac_saldo,
        usac_type: updateUsersAccountDto.usac_type,
        usac_status: updateUsersAccountDto.usac_status,
      };
  
      const [result, _]:any = await this.sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });
  
      if (result[1] === 0) {
        return {
          status: 404,
          message: 'Data akun pengguna tidak ditemukan',
        };
      }
  
      const success = {
        message: 'Sukses mengupdate akun pengguna',
        status: 200,
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


  // async updateUserAccountWFintech(id: number, updateUsersAccountDto: UpdateUsersAccountDto): Promise<any> {
  //   try {
  //     const query = `
  //       UPDATE payment.users_account
  //       SET
  //         usac_fint_entity_id = :fint_entity_id,
  //         usac_account_number = :usac_account_number,
  //         usac_saldo = :usac_saldo,
  //         usac_type = :usac_type,
  //         usac_status = :usac_status
  //       WHERE
  //         usac_user_entity_id = :usac_user_entity_id
  //     `;
  
  //     const replacements: any = {
  //       usac_fint_entity_id: updateUsersAccountDto.usac_fint_entity_id,
  //       usac_user_entity_id: id,
  //       usac_account_number: updateUsersAccountDto.usac_account_number,
  //       usac_saldo: updateUsersAccountDto.usac_saldo,
  //       usac_type: updateUsersAccountDto.usac_type,
  //       usac_status: updateUsersAccountDto.usac_status,
  //     };
  
  //     const [result, _]:any = await this.sequelize.query(query, {
  //       replacements,
  //       type: QueryTypes.UPDATE,
  //     });
  
  //     if (result[1] === 0) {
  //       return {
  //         status: 404,
  //         message: 'Data akun pengguna tidak ditemukan',
  //       };
  //     }
  
  //     const success = {
  //       message: 'Sukses mengupdate akun pengguna',
  //       status: 200,
  //     };
  
  //     return success;
  //   } catch (error) {
  //     const errorm = {
  //       message: error.message,
  //       status: 400,
  //     };
  
  //     return errorm;
  //   }
  // }


  async deleteUserAccount(id: number): Promise<any> {
    try {
      const result: any = await this.sequelize.query(
        'DELETE FROM payment.users_account WHERE usac_user_entity_id = :usac_user_entity_id',
        {
          replacements: {
            usac_user_entity_id: id,
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
