import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { JobHireService } from "./jobhire.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { client, job_post } from "models/jobhireSchema";

const fileUpload = FileInterceptor("image", {
  storage: diskStorage({
    destination: "./public/jobhire",
    filename: async (req, file, cb) => {
      const clitId = req.body.jopo_clit_id;
      const clit = await client.findOne({
        where: {
          clit_id: clitId,
        },
        attributes: ["clit_name"],
      });
      const filename = `${clit.clit_name}-${file.originalname}`;
      cb(null, filename);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new HttpException(
          "File hanya boleh file gambar!",
          HttpStatus.FORBIDDEN
        ),
        false
      );
    }
    cb(null, true);
  },
});

@Controller("job-hire")
export class JobHireController {
  constructor(private readonly jobHireService: JobHireService) {}

  //JOB POST
  @Post("create")
  @UseInterceptors(fileUpload)
  createJopo(
    @Body() createJopo: any,
    @UploadedFile() image: Express.Multer.File
  ) {
    // createJopo.jopho_filename = image.filename;
    console.log("IMAGE", image.filename);
    return this.jobHireService.createJopo(createJopo, image);
  }

  @Get("search")
  searchJobPost(
    @Query("key") key?: string,
    @Query("loc") loc?: string,
    @Query("job") job?: string,
    @Query("type") type?: any,
    @Query("jobType") jobtype?: any,
    @Query("expe") expe?: any,
    @Query("terupdate") terupdate?: any,
    @Query("newest") newest?: any
  ) {
    return this.jobHireService.searchJobPost(
      key || "",
      loc || "",
      job || "",
      type || "",
      jobtype || "",
      expe || "",
      terupdate || "",
      newest || ""
    );
  }

  @Get("alljob")
  findJopoAll() {
    return this.jobHireService.findJopoAll();
  }

  @Get("photo")
  findJopho() {
    return this.jobHireService.findJopho();
  }

  @Get("currnum")
  findCurrentNumber() {
    return this.jobHireService.findCurrentNumber();
  }

  @Get("emprange")
  findEmpRange() {
    return this.jobHireService.findAllEmprange();
  }

  @Get("find/:id")
  findOneJopo(@Param("id") id: string) {
    return this.jobHireService.findOneJopo(+id);
  }

  @Patch("update/:id")
  @UseInterceptors(fileUpload)
  updateJopo(
    @Param("id") id: string,
    @Body() updateJobHireDto: any,
    @UploadedFile() images: Express.Multer.File
  ) {
    return this.jobHireService.updateJopo(+id, updateJobHireDto, images);
  }

  @Delete("delete/:id")
  removeJopo(@Param("id") id: string) {
    return this.jobHireService.removeJopo(+id);
  }

  @Patch("status")
  updateStatus(@Body() status: any) {
    return this.jobHireService.updateStatus(status);
  }

  // CLIENT
  @Post("client")
  createClient(@Body() createClient: any) {
    return this.jobHireService.createClient(createClient);
  }

  @Get("client")
  findAllClient(@Body() show: any) {
    const pagination = show.pagination;
    const search = show.search;
    return this.jobHireService.findAllClient(pagination, search);
  }

  @Get("allclient")
  allClientFind() {
    return this.jobHireService.allClientFind();
  }

  @Patch("client/update/:id")
  updateClient(@Param("id") id: string, @Body() updateJobHireDto: any) {
    return this.jobHireService.updateClient(+id, updateJobHireDto);
  }

  @Get("client/find/:id")
  findOne(@Param("id") id: string) {
    return this.jobHireService.findOneClient(+id);
  }

  @Get("clientall")
  findClient() {
    return this.jobHireService.findClient();
  }

  // TALENT
  @Post("talent")
  createTalent(@Body() createTalent: any) {
    return this.jobHireService.createTalent(createTalent);
  }

  @Get("talent")
  findProCandidate() {
    return this.jobHireService.findProCandidate();
  }

  @Get("talent/apply")
  CandidateApply() {
    return this.jobHireService.CandidateApply();
  }

  @Get("talent/interview")
  CandidateInterview() {
    return this.jobHireService.CandidateInterview();
  }

  @Get("talent/contract")
  CandidateContract() {
    return this.jobHireService.CandidateContract();
  }

  @Get("talent/failed")
  CandidateFailed() {
    return this.jobHireService.CandidateFailed();
  }

  @Patch("talent/update")
  updateTalent(@Body() updateTalent: any) {
    console.log(updateTalent);
    return this.jobHireService.updateTalent(updateTalent);
  }

  // MASTER
  @Get("master/roac")
  findRouteAction() {
    return this.jobHireService.findRouteAction();
  }

  @Get("master/edu")
  findEducation() {
    return this.jobHireService.findEducation();
  }

  @Get("master/worktype")
  findWorktype() {
    return this.jobHireService.findWorktype();
  }

  @Get("master/jobrole")
  findJobrole() {
    return this.jobHireService.findJobrole();
  }

  @Get("master/industry")
  findIndustry() {
    return this.jobHireService.findIndustry();
  }

  @Get("master/city")
  findCity() {
    return this.jobHireService.findCity();
  }
}
