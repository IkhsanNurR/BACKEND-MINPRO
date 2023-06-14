import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillTypeDto } from './create-skill_type.dto';

export class UpdateSkillTypeDto extends PartialType(CreateSkillTypeDto) {}
