import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";
import { BootcampService } from "./bootcamp.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import messageHelper from "src/messagehelper/message";
import * as fse from "fs-extra";
import { Express } from "express";

export function MultiFileInterceptorWithDest(destination: string) {
  return FileFieldsInterceptor(
    [
      { name: "foto", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
          const firstname = req.body?.user_firstname;
          const uniqueSuffix = file.originalname;
          return cb(
            null,
            file.fieldname + "-" + firstname + "-" + uniqueSuffix
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx|doc)$/)) {
          return cb(new HttpException("Invalid file type", 403), false);
        }
        cb(null, true);
      },
    }
  );
}

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

  @Post("applybatch")
  @UseInterceptors(MultiFileInterceptorWithDest("./public/users"))
  async createProduct(
    @Body() createbatch: any,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<any> {
    const images = [files.cv?.[0], files.foto?.[0]].filter(Boolean);
    if (images.length < 2) {
      for (let i = 0; i < images.length; i++) {
        const imagePath = "./image/" + images[i].filename;
        const exist = fse.existsSync(imagePath);
        if (fse.existsSync(imagePath)) {
          fse.remove(imagePath);
        }
      }
      images.forEach((i) => {});
      return messageHelper("2 Field file harus diisi semua ya!", 400, "Gagal!");
    }
    return this.bootcampService.ApplyBatch(images, createbatch);
  }
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

  @Patch("pendingbatch")
  async PostPendingBatch(@Body() data: any): Promise<any> {
    return await this.bootcampService.PostPendingBatch(data);
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

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bootcampService.remove(+id);
  }
}
