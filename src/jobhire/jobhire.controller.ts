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
} from '@nestjs/common';
import { JobHireService } from './jobhire.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { client, job_post } from 'models/jobhireSchema';

// export function uploadGambar(): ReturnType<typeof FileInterceptor> {
// const fileUpload = FileInterceptor('image', {
//   storage: diskStorage({
//     destination: './images',
//     filename: async (req, file, cb) => {
//       try {
//         const clitId = req.body.jopo_clit_id;
//         const clit = await client.findOne({
//           where: {
//             clit_id: clitId,
//           },
//           attributes: ['clit_name'],
//         });

//         if (!clit) {
//           throw new Error('Client not found');
//         }

//         const filename = `${clit.clit_name}-${file.originalname}`;
//         cb(null, filename);
//       } catch (error) {
//         cb(null, error);
//       }
//     },
//   }),
const fileUpload = FileInterceptor('image', {
  storage: diskStorage({
    destination: 'public/jobhire/image',
    filename: async (req, file, cb) => {
      const clitId = req.body.jopo_clit_id;
      const clit = await client.findOne({
        where: {
          clit_id: clitId,
        },
        attributes: ['clit_name'],
      });
      const filename = `${clit.clit_name}-${file.originalname}`;
      cb(null, filename);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new HttpException(
          'File hanya boleh file gambar!',
          HttpStatus.FORBIDDEN,
        ),
        false,
      );
    }
    cb(null, true);
  },
});

@Controller('job-hire')
export class JobHireController {
  constructor(private readonly jobHireService: JobHireService) {}

  //JOB POST
  @Post('create')
  @UseInterceptors(fileUpload)
  createJopo(
    @Body() createJopo: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // createJopo.jopho_filename = image.filename;
    console.log('IMAGE', image.filename);
    return this.jobHireService.createJopo(createJopo, image);
  }

  @Get()
  findAll(@Body() show: any) {
    const pagination = show.pagination;
    const search = show.search;
    const filter = show.filter;
    // console.log("limit",+show.pagination.limit, "offset", +show.pagination.offset);
    return this.jobHireService.findAllJopo(pagination, search, filter);
  }

  @Get('alljob')
  findJopoAll() {
    return this.jobHireService.findJopoAll();
  }

  @Get('photo')
  findJopho() {
    return this.jobHireService.findJopho();
  }

  @Get('currnum')
  findCurrentNumber() {
    return this.jobHireService.findCurrentNumber();
  }

  @Get('emprange')
  findEmpRange() {
    return this.jobHireService.findAllEmprange();
  }

  @Get('find/:id')
  findOneJopo(@Param('id') id: string) {
    return this.jobHireService.findOneJopo(+id);
  }

  @Patch('update/:id')
  @UseInterceptors(fileUpload)
  updateJopo(
    @Param('id') id: string,
    @Body() updateJobHireDto: any,
    @UploadedFile() images: Express.Multer.File,
  ) {
    return this.jobHireService.updateJopo(+id, updateJobHireDto, images);
  }

  @Delete('delete/:id')
  removeJopo(@Param('id') id: string) {
    return this.jobHireService.removeJopo(+id);
  }

  // CLIENT
  @Post('client')
  createClient(@Body() createClient: any) {
    return this.jobHireService.createClient(createClient);
  }

  @Get('client')
  findAllClient(@Body() show: any) {
    const pagination = show.pagination;
    const search = show.search;
    return this.jobHireService.findAllClient(pagination, search);
  }

  @Get('allclient')
  allClientFind() {
    return this.jobHireService.allClientFind();
  }

  @Patch('client/update/:id')
  updateClient(@Param('id') id: string, @Body() updateJobHireDto: any) {
    return this.jobHireService.updateClient(+id, updateJobHireDto);
  }

  @Get('client/find/:id')
  findOne(@Param('id') id: string) {
    return this.jobHireService.findOneClient(+id);
  }

  @Get('clientall')
  findClient() {
    return this.jobHireService.findClient();
  }
}