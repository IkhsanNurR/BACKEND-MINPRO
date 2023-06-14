import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { city } from 'models/masterSchema';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(city) private readonly City: typeof city
  ) { }
  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    try {
      const res = await this.City.findAll()
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
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
