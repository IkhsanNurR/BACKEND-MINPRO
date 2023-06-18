import { IsInt, IsString, IsNumber, IsDate, IsIn, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateUsersAccountDto {
  
  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  usac_fint_entity_id?: number;

  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  usac_bank_entity_id?: number;

  @IsNotEmpty()
  @IsInt()
  usac_user_entity_id: number;

  @IsNotEmpty()
  @IsString()
  usac_account_number: string;

  @IsNotEmpty()
  @IsNumber()
  usac_saldo: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['debet', 'credit card', 'payment'])
  usac_type: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive', 'blokir'])
  usac_status: string;
}
