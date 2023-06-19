import { IsNotEmpty, IsString } from "class-validator";

export class file {
  @IsNotEmpty()
  @IsString()
  filename: string;
}
