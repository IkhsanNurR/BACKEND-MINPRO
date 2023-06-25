import { Module } from "@nestjs/common";
import { SpecialofferService } from "./specialoffer.service";
import { SpecialofferController } from "./specialoffer.controller";
@Module({
  imports: [],
  controllers: [SpecialofferController],
  providers: [SpecialofferService],
})
export class SpecialofferModule {}
