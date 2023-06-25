import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartitemService } from "./cartitem.service";
// import { CreateCartitemDto } from './dto/create-cartitem.dto';
// import { UpdateCartitemDto } from './dto/update-cartitem.dto';

@Controller("sales/cartitem")
export class CartitemController {
  constructor(private readonly cartitemService: CartitemService) {}

  @Post()
  create(@Body() createCartitemDto: any) {
    return this.cartitemService.create(createCartitemDto);
  }

  @Get()
  findAll() {
    return this.cartitemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartitemService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartitemDto: UpdateCartitemDto) {
  //   return this.cartitemService.update(+id, updateCartitemDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartitemService.remove(+id);
  }
}
