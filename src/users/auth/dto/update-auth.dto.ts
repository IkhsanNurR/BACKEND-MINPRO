import { PartialType } from '@nestjs/mapped-types';
import { loginDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(loginDto) {}
