import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BootcampService } from "./bootcamp.service";
import { CreateBootcampDto } from "./dto/create-bootcamp.dto";
import { UpdateBootcampDto } from "./dto/update-bootcamp.dto";

@Controller("bootcamp")
export class BootcampController {
  constructor(private readonly bootcampService: BootcampService) {}

  @Post()
  create(@Body() createBootcampDto: CreateBootcampDto) {
    return this.bootcampService.create(createBootcampDto);
  }

  //get semua
  @Get()
  FindAllBatch() {
    return this.bootcampService.AppBatchFindAll();
  }

  @Get("findBatch/:id")
  FindBatchById(@Param("id") id: number) {
    return this.bootcampService.AppBatchFindById(+id);
  }

  @Get("members/:id")
  FindMembersBatchById(@Param("id") id: number) {
    return this.bootcampService.GetAppBatchMembers(+id);
  }

  @Get("progname")
  FindProgname() {
    return this.bootcampService.GetProgName();
  }

  @Get("trainer")
  FindTrainerName() {
    return this.bootcampService.GetTrainerName();
  }

  @Get("orangdaftarupdate")
  FindOrangDaftarUpdate() {
    return this.bootcampService.GetOrangCreateUpdateBatch();
  }

  @Get("orangapply")
  FindOrangApply() {
    return this.bootcampService.GetOrangApply();
  }

  @Get("orangfiltering")
  FindOrangFiltering() {
    return this.bootcampService.GetOrangFiltering();
  }

  @Get("orangcontract")
  FindOrangContract() {
    return this.bootcampService.GetOrangContract();
  }

  @Get("orangnotresponding")
  FindOrangNotResponding() {
    return this.bootcampService.GetOrangNotResponding();
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.bootcampService.findOne(+id);
  // }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBootcampDto: UpdateBootcampDto
  ) {
    return this.bootcampService.update(+id, updateBootcampDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bootcampService.remove(+id);
  }
}
