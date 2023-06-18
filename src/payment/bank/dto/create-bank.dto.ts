import { IsNotEmpty, IsString } from "class-validator";

export class CreateBankDto {

    @IsNotEmpty()
    @IsString()
    bank_code: string;
  
    @IsNotEmpty()
    @IsString()
    bank_name: string;
}
