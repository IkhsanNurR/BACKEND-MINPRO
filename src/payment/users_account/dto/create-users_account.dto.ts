import { IsInt, IsString, IsNumber, IsIn, IsNotEmpty } from "class-validator";

export class CreateUsersAccountDto {
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
  @IsIn(["debet", "credit card", "payment"])
  usac_type: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(["active", "inactive", "blokir"])
  usac_status: string;

  @IsNotEmpty()
  @IsString()
  bank_name: string;
}
