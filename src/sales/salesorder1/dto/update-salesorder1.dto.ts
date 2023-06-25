import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesorder1Dto } from './create-salesorder1.dto';

export class UpdateSalesorder1Dto extends PartialType(CreateSalesorder1Dto) {}
