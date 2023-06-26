import { Injectable } from "@nestjs/common";
import { CreateTransactionPaymentDto } from "./dto/create-transaction_payment.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes, Transaction } from "sequelize";

@Injectable()
export class TransactionPaymentService {
  constructor(private sequelize: Sequelize) {}

  async Topup(createTransactionPaymentDto: CreateTransactionPaymentDto): Promise<any> {
    try {
      const { trpa_source_id, trpa_target_id, trpa_credit } = createTransactionPaymentDto;
      const query = await this.sequelize.query(
        `CALL payment.Topup(:p_usac_account_number_bank, :p_usac_account_number_fintech, :p_credit)`,
        {
          replacements: {
            p_usac_account_number_bank: trpa_source_id,
            p_usac_account_number_fintech: trpa_target_id,
            p_credit: trpa_credit,
          },
          type: QueryTypes.RAW,
        }
      );

      /* Jika ingin menggunakan trpa_note
      const { p_usac_account_number_bank, p_usac_account_number_fintech, p_credit, p_trpa_type, p_trpa_note } = req.body;

    // Execute the stored procedure
    const query = await sequelize.query(
      `CALL payment.Topup(:p_usac_account_number_bank, :p_usac_account_number_fintech, :p_credit, :p_trpa_type, :p_trpa_note)`,
      {
        replacements: {
          p_usac_account_number_bank,
          p_usac_account_number_fintech,
          p_credit,
          p_trpa_type,
          p_trpa_note,
        },
        type: QueryTypes.RAW,
      }
    );
      */
  
      return query;
    } catch (error) {
      return error.message;
    }
  }

  async TransactionView (): Promise<any>{
    try {
        const data = await this.sequelize.query('select * FROM payment.transaction_history')
        const success = {
          message: 'sukses',
          data: data[0]
        }
        return success;
    } catch (error) {
      return error.message;
    }
  }
}
