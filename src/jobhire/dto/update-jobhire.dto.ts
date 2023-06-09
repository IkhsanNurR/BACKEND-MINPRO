import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhireDto } from './create-jobhire.dto';

export class UpdateJobhireDto extends PartialType(CreateJobhireDto) {}
