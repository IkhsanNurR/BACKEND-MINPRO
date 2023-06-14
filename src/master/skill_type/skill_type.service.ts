import { Injectable } from '@nestjs/common';
import { CreateSkillTypeDto } from './dto/create-skill_type.dto';
import { UpdateSkillTypeDto } from './dto/update-skill_type.dto';

@Injectable()
export class SkillTypeService {
  create(createSkillTypeDto: CreateSkillTypeDto) {
    return 'This action adds a new skillType';
  }

  findAll() {
    return `This action returns all skillType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skillType`;
  }

  update(id: number, updateSkillTypeDto: UpdateSkillTypeDto) {
    return `This action updates a #${id} skillType`;
  }

  remove(id: number) {
    return `This action removes a #${id} skillType`;
  }
}
