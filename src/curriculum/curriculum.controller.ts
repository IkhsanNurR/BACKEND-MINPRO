import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  UploadedFiles,
} from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CreateCurriculumDto } from "./dto/create-curriculum.dto";
import { UpdateCurriculumDto } from "./dto/update-curriculum.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as crypto from "crypto";
import { ParseFilePipeBuilder } from "@nestjs/common";

export function uploadGambar(): ReturnType<typeof FileInterceptor> {
  return FileInterceptor("image", {
    storage: diskStorage({
      destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/public/curiculum`);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
          null,
          file.fieldname +
            "-" +
            uniqueSuffix +
            "." +
            file.originalname.split(".").pop()
        );
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
        return cb(new Error("Salah"), false);
      }
      cb(null, true);
    },
  });
}
@Controller("curriculum")
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post("tambah")
  @UseInterceptors(uploadGambar())
  createProdoct(
    @Body() createcurriculumDTO: CreateCurriculumDto,
    @UploadedFile() image: any
  ): any {
    const data = {
      ...createcurriculumDTO,
      prog_image: image.filename, // Menggunakan properti filename dari image
    };
    return this.curriculumService.create(data);
  }

  // @Controller('curriculum')
  // export class CurriculumController {
  //   constructor(private readonly curriculumService: CurriculumService) {}

  // @Post('tambah')
  // @UseInterceptors(FileInterceptor('image', {
  //   storage: diskStorage({
  //     destination: `./images`,
  //     filename: (req, file, cb) => {
  //       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //       cb(
  //         null,
  //         file.fieldname +
  //           "-" +
  //           uniqueSuffix +
  //           "." +
  //           file.originalname.split(".").pop()
  //       );
  //     },
  //   }),
  //   fileFilter: (req, file, cb) => {
  //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
  //       return cb(new Error('Salah'), false);
  //     }
  //     cb(null, true);
  //   },
  // }))
  // createProdoct( @Body() createcurriculumDTO: CreateCurriculumDto,@UploadedFile() image: any):any {
  //   return this.curriculumService.create(createcurriculumDTO,image);
  // }

  @Get("lala")
  findAll(@Body() show: any) {
    // const pagination = show.pagination;
    const search = show.search;
    const filter = show.filter;
    return this.curriculumService.findAll(search, filter);
  }

  @Get("curr")
  findCurrRegNumber() {
    return this.curriculumService.findCurrRegNumber();
  }

  @Get("lele/:id")
  findOne(@Param("id") id: string) {
    return this.curriculumService.findOne(+id);
  }

  @Patch("koko/:id")
  @UseInterceptors(uploadGambar())
  update(
    @Param("id") id: number,
    @Body() updateProductDto: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log("FILE", file);
    updateProductDto.prog_image = file.filename;
    return this.curriculumService.update(id, updateProductDto, file);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.curriculumService.remove(+id);
  }

  @Get("getMerged")
  MergeSection() {
    // return 'hehe'
    return this.curriculumService.MergeSection();
  }
  @Get("profil")
  get() {
    return this.curriculumService.get();
  }
  @Post("section")
  createSections(@Body() CreateCurriculumDto: any) {
    return this.curriculumService.createSections(CreateCurriculumDto);
  }

  @Post("section_detail/:id")
  @UseInterceptors(
    FilesInterceptor("filelink", 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let destination;
          if (
            file.mimetype.startsWith("image") ||
            file.originalname.endsWith(".jpg") ||
            file.originalname.endsWith(".jpeg") ||
            file.originalname.endsWith(".png")
          ) {
            destination = "image";
          } else if (
            file.mimetype.startsWith("video") ||
            file.originalname.endsWith(".mp4") ||
            file.originalname.endsWith(".avi") ||
            file.originalname.endsWith(".movi")
          ) {
            destination = "videos";
          } else {
            destination = "files";
          }
          cb(null, destination);
        },
        filename: (req, file, callback) => {
          const salt =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const imageNameWithSalt = file.originalname + salt;
          const md5Hash = crypto
            .createHmac("md5", "1234")
            .update(imageNameWithSalt)
            .digest("base64");
          const filename = `${md5Hash}_${file.originalname}`;
          callback(null, filename);
        },
      }),
    })
  )
  createSectionsDetail(
    @Param("id") id: string,
    @Body() CreateCurriculumDto: any,
    @UploadedFiles()
    files: Express.Multer.File[]
  ) {
    files.forEach((file) => {
      CreateCurriculumDto.filelink = file.filename;
    });
    return this.curriculumService.createSectionsDetail(
      +id,
      CreateCurriculumDto
    );
  }
}
