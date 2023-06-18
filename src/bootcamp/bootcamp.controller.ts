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

  @Get("trainee/:batch/:id")
  FindTraineeById(@Param("batch") batch: any, @Param("id") id: any) {
    return this.bootcampService.GetTraineeById(+batch, +id);
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

  @Get("orangdisqualified")
  FindOrangDisqualified() {
    return this.bootcampService.GetOrangDisqualified();
  }

  @Get("orangnotresponding")
  FindOrangNotResponding() {
    return this.bootcampService.GetOrangNotResponding();
  }

  @Get("orangtrainer")
  FindTrainer() {
    return this.bootcampService.GetTrainerName;
  }

  //post
  //batch
  @Post("createbatch")
  async PostCreateBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostCreateBatch(data);
  }

  @Patch("editbatch")
  async PostEditBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostEditBatch(data);
  }

  @Patch("settorunning")
  async PostSetToRunningBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostSetBatchToRunning(data);
  }

  @Patch("closebatch")
  async PostSetToCloseBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostSetBatchToClose(data);
  }

  @Patch("deletebatch")
  async PostDeleteBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostDeleteBatch(data);
  }

  @Patch("extendbatch")
  async PostExtendBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostExtendBatch(data);
  }

  @Patch("evaluation/evaluationdetail")
  async PostEvaluationDetail(@Body() data: any): Promise<any> {
    return this.bootcampService.PostEvaluationDetail(data);
  }

  @Patch("evaluation/editstatusevaluation")
  async PostEditStatusEvaluation(@Body() data: any): Promise<any> {
    return this.bootcampService.PostEditStatusEvaluation(data);
  }

  //candidate
  @Patch("updatestatusapply")
  async PostUpdateStatusApply(@Body() data: any) {
    return await this.bootcampService.UpdateCandidateStatusApply(data);
  }

  @Patch("updatecandidatefiltering")
  async PostUpdateCandidateFiltering(@Body() data: any) {
    return await this.bootcampService.UpdateCandidateStatusFiltering(data);
  }

  @Patch("updatecandidatecontract")
  async PostUpdateCandidateContracted(@Body() data: any) {
    return await this.bootcampService.UpdateCandidateStatusContract(data);
  }

  @Patch("updatecandidatedisqualified")
  async PostUpdateCandidateDisqualified(@Body() data: any) {
    return await this.bootcampService.UpdateCandidateStatusDisqualified(data);
  }

  @Patch("updatecandidatenotresponding")
  async PostUpdateCandidateNotResponding(@Body() data: any) {
    return await this.bootcampService.UpdateCandidateStatusNotResponding(data);
  }

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
