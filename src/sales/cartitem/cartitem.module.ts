import { Module } from "@nestjs/common";
import { CartitemService } from "./cartitem.service";
import { CartitemController } from "./cartitem.controller";
@Module({
  imports: [],
  controllers: [CartitemController],
  providers: [CartitemService],
})
export class CartitemModule {}
