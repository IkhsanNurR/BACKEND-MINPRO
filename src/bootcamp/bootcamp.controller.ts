import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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

export function MultiFileInterceptorWithDest() {
  return FileFieldsInterceptor(
    [
      { name: "foto", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log(file.mimetype);
          console.log(file.originalname.endsWith(".jpg"));
          if (
            file.mimetype.startsWith("image") ||
            file.originalname.endsWith(".jpg") ||
            file.originalname.endsWith(".jpeg") ||
            file.originalname.endsWith(".png")
          ) {
            cb(null, "./public/users/image");
          } else {
            cb(null, "./public/users/resume");
          }
        },
        filename: async (req, file, cb) => {
          const random =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const Suffix = file.originalname.trim();
          console.log(file);
          return cb(null, file.fieldname + "-" + random + "-" + Suffix);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx|doc)$/)) {
          return cb(new HttpException("Invalid file type", 403), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2097152,
      },
    }
  );
}

// const MultiFileInterceptorWithDest = (
//   destination: string
// ): ReturnType<typeof FileFieldsInterceptor> => {
//   return FileFieldsInterceptor(
//     [
//       { name: "foto", maxCount: 1 },
//       { name: "cv", maxCount: 1 },
//     ],
//     {
//       storage: diskStorage({
//         destination: destination,
//         filename: (req, file, cb) => {
//           const firstname = req.body.id;
//           console.log("first", req);
//           const uniqueSuffix = file.originalname;
//           return cb(null, `${file.fieldname}-${firstname}-${uniqueSuffix}`);
//         },
//       }),
//       fileFilter: (req, file, cb) => {
//         if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx|doc)$/)) {
//           return cb(new HttpException("Invalid file type", 403), false);
//         }
//         cb(null, true);
//       },
//     }
//   );
// };

// export { MultiFileInterceptorWithDest };

@Controller("bootcamp")
export class BootcampController {
  constructor(private readonly bootcampService: BootcampService) {}

  //post
  @Post("applybatch")
  @UseInterceptors(MultiFileInterceptorWithDest())
  async applybatch(
    @Body() createbatch: any,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] }
  ) {
    // console.log(createbatch);
    const filesnya = [files.cv?.[0], files.foto?.[0]].filter(Boolean);
    if (filesnya.length < 2) {
      for (let i = 0; i < filesnya.length; i++) {
        if (filesnya[i].fieldname == "cv") {
          const pdfPath = "./public/users/resume" + filesnya[i].filename;
          const exist = fse.existsSync(pdfPath);
          if (fse.existsSync(pdfPath)) {
            fse.remove(pdfPath);
          }
        } else {
          const imagePath = "./public/users/image" + filesnya[i].filename;
          const exist = fse.existsSync(imagePath);
          if (fse.existsSync(imagePath)) {
            fse.remove(imagePath);
          }
        }
      }
      return messageHelper("2 Field file harus diisi semua ya!", 400, "Gagal!");
    }
    return this.bootcampService.ApplyBatch(filesnya, createbatch);
  }

  @Get("bootcampindex")
  FindBootcampIndex() {
    return this.bootcampService.GetBootcampIndex();
  }

  @Get("talentbootcamp")
  FindTalents() {
    return this.bootcampService.GetTalents();
  }

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

  //patch-post
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
