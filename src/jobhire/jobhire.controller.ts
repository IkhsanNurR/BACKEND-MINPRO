import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobhireService } from './jobhire.service';
import { CreateJobhireDto } from './dto/create-jobhire.dto';
import { UpdateJobhireDto } from './dto/update-jobhire.dto';

@Controller('jobhire')
export class JobhireController {
  constructor(private readonly jobhireService: JobhireService) {}

  @Post()
  create(@Body() createJobhireDto: CreateJobhireDto) {
    return this.jobhireService.create(createJobhireDto);
  }

  @Get()
  findAll() {
    return this.jobhireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobhireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobhireDto: UpdateJobhireDto) {
    return this.jobhireService.update(+id, updateJobhireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobhireService.remove(+id);
  }
}
