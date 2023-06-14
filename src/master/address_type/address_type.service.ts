import { Injectable } from '@nestjs/common';
import { CreateAddressTypeDto } from './dto/create-address_type.dto';
import { UpdateAddressTypeDto } from './dto/update-address_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { address_type } from 'models/masterSchema';

@Injectable()
export class AddressTypeService {
  constructor(
    @InjectModel(address_type) private readonly AddressType: typeof address_type
  ) {

  }
  create(createAddressTypeDto: CreateAddressTypeDto) {
    return 'This action adds a new addressType';
  }

  async findAll() {
    try {
      const res = await this.AddressType.findAll()
      return {
        data: res,
        message: 'sukses',
        status: 200
      }
    } catch (error) {
      return error.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} addressType`;
  }

  update(id: number, updateAddressTypeDto: UpdateAddressTypeDto) {
    return `This action updates a #${id} addressType`;
  }

  remove(id: number) {
    return `This action removes a #${id} addressType`;
  }
}
