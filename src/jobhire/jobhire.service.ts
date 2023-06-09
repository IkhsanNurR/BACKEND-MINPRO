import { Injectable } from '@nestjs/common';
import { CreateJobhireDto } from './dto/create-jobhire.dto';
import { UpdateJobhireDto } from './dto/update-jobhire.dto';

@Injectable()
export class JobhireService {
  create(createJobhireDto: CreateJobhireDto) {
    return 'This action adds a new jobhire';
  }

  findAll() {
    return `This action returns all jobhire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobhire`;
  }

  update(id: number, updateJobhireDto: UpdateJobhireDto) {
    return `This action updates a #${id} jobhire`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobhire`;
  }
}
