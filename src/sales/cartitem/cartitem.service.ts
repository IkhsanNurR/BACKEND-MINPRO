import { Injectable } from "@nestjs/common";
// import { CreateCartitemDto } from './dto/create-cartitem.dto';
// import { UpdateCartitemDto } from './dto/update-cartitem.dto';
import { Sequelize } from "sequelize-typescript";
@Injectable()
export class CartitemService {
  constructor(private sequelize: Sequelize) {}
  async create(fields: any): Promise<any> {
    try {
      const data = fields.data;
      console.log(data);

      // const data = `[${JSON.stringify(createCartitemDto)}]`
      // console.log(data);
      // console.log(createCartitemDto);
      const result = await this.sequelize.query(
        `CALL sales.insert_cart_items(:data)`,
        {
          replacements: {
            data: JSON.stringify(data),
          },
        }
      );
      console.log(result);

      return { message: "data cart items berhasil diinput", data: result[0] };
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      // const viewquery =
      const resultview = await this.sequelize.query(
        "select * from sales.viewcartitems"
      );
      return {
        message: "data berhasil ditampilkan",
        data: resultview[0],
      };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const viewquery = `select * from sales.viewcartitems where cait_user_entity_id = ${id}`;
      const resultview = await this.sequelize.query(viewquery);

      return { message: "data berhasil ditampilkan", data: resultview[0] };
    } catch (error) {
      return error.message;
    }
  }

  // update(id: number, updateCartitemDto: UpdateCartitemDto) {
  //   return `This action updates a #${id} cartitem`;
  // }

  async remove(id: number): Promise<any> {
    try {
      const result = await this.sequelize.query(
        `call sales.deletecartitems(${id})`
      );
      return { message: "data sales order berhasil dihapus" };
    } catch (error) {
      return error.message;
    }
  }
}
