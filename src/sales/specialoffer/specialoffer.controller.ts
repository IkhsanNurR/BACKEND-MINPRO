import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SpecialofferService } from "./specialoffer.service";
// import { CreateSpecialofferDto } from './dto/create-specialoffer.dto';
// import { UpdateSpecialofferDto } from './dto/update-specialoffer.dto';

@Controller("sales/specialoffer")
export class SpecialofferController {
  constructor(private readonly specialofferService: SpecialofferService) {}

  @Post()
  async create(@Body() createSpecialofferDto: any): Promise<any> {
    return this.specialofferService.create(createSpecialofferDto);
  }

  @Get()
  findAll() {
    return this.specialofferService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.specialofferService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSpecialofferDto: UpdateSpecialofferDto) {
  //   return this.specialofferService.update(+id, updateSpecialofferDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.specialofferService.remove(+id);
  }
}
