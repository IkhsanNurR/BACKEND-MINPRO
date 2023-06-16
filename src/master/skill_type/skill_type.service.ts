import { Injectable } from '@nestjs/common';
import { CreateSkillTypeDto } from './dto/create-skill_type.dto';
import { UpdateSkillTypeDto } from './dto/update-skill_type.dto';
import { skill_type } from 'models/masterSchema';

@Injectable()
export class SkillTypeService {
  create(createSkillTypeDto: CreateSkillTypeDto) {
    return 'This action adds a new skillType';
  }

  async findAll() {
    try {
      const result = await skill_type.findAll()
      return {
        data: result,
        message: 'sukses',
        status: 200
      }
    } catch (e) {
      return e.message
    }
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
