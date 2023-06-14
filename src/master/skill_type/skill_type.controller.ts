import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillTypeService } from './skill_type.service';
import { CreateSkillTypeDto } from './dto/create-skill_type.dto';
import { UpdateSkillTypeDto } from './dto/update-skill_type.dto';

@Controller('skill-type')
export class SkillTypeController {
  constructor(private readonly skillTypeService: SkillTypeService) {}

  @Post()
  create(@Body() createSkillTypeDto: CreateSkillTypeDto) {
    return this.skillTypeService.create(createSkillTypeDto);
  }

  @Get()
  findAll() {
    return this.skillTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillTypeDto: UpdateSkillTypeDto) {
    return this.skillTypeService.update(+id, updateSkillTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillTypeService.remove(+id);
  }
}
