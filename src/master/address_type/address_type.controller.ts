import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressTypeService } from './address_type.service';
import { CreateAddressTypeDto } from './dto/create-address_type.dto';
import { UpdateAddressTypeDto } from './dto/update-address_type.dto';

@Controller('addresstype')
export class AddressTypeController {
  constructor(private readonly addressTypeService: AddressTypeService) {}

  @Post()
  create(@Body() createAddressTypeDto: CreateAddressTypeDto) {
    return this.addressTypeService.create(createAddressTypeDto);
  }

  @Get()
  findAll() {
    return this.addressTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressTypeDto: UpdateAddressTypeDto) {
    return this.addressTypeService.update(+id, updateAddressTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressTypeService.remove(+id);
  }
}
