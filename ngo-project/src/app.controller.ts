import { Body, Controller, Get, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';
import { aboutUsDto, completeProjectCreation, homePage, pageDescriptionDto, setFooterDto } from './dto/homePage.dto';


@ApiTags('pages data')
@Controller('page')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('uploadFile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 10 }]
    , {
      storage: diskStorage({
        destination: '/home/ngo/uploadFile'
        , filename: (req, files, cb) => {
          // console.log('here is files>>>>>' , files)
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(files.originalname)}`)
        }
      })
    }))
  async upload(@Req() req, @Res() res, @UploadedFiles(
  ) picture) {
    // console.log()
    // console.log('' ,picture)
    // console.log(req.user)
    return this.appService.uploadPicture(req, res, picture.picture)
    // return profile
  }


  @Get('/home')
  @ApiOperation({ summary: 'دیتاهای صفحه هوم' })
  @ApiResponse({
    status: 200, description: 'get home page data',
    schema: {
      example: {
        success: true,
        message: 'get home page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getHomeData(@Req() req: any, @Res() res: any) {
    return this.appService.homeData(req, res)
  }



  @Post('/home/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه هوم' })
  @ApiResponse({
    status: 200, description: 'set home page data',
    schema: {
      example: {
        success: true,
        message: 'set home page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: homePage,
    description: 'بادی برای اپدیت صفحه هوم'
  })
  async setHomeData(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: homePage) {
    return this.appService.setHomeData(req, res, body)
  }




  @Post('/project/complete/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه پروژه های تکمیل شده' })
  @ApiResponse({
    status: 200, description: 'set project page data',
    schema: {
      example: {
        success: true,
        message: 'set peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: completeProjectCreation,
    description: 'بادی برای اپدیت صفحه هوم'
  })
  async completedProject(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: completeProjectCreation) {
    return this.appService.setCompletedProjectPage(req, res, body)
  }


  @Get('/project/complete')
  @ApiOperation({ summary: 'گت کردن دیتاهای صفحه پروژه های تکمیل شده' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getCompletedProject(@Req() req: any, @Res() res: any) {
    return this.appService.getCompleteProjectPage(req, res)
  }




  @Post('/project/ongoing/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه پروژه های در حال اچرا' })
  @ApiResponse({
    status: 200, description: 'set project page data',
    schema: {
      example: {
        success: true,
        message: 'set peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: completeProjectCreation,
    description: 'بادی برای اپدیت صفحه پروژه های در حال اچرا'
  })
  async ongoingProject(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: completeProjectCreation) {
    return this.appService.setOngongProjectPage(req, res, body)
  }


  @Get('/project/ongoing')
  @ApiOperation({ summary: 'گت کردن دیتاهای صفحه پروژه های  ذر حال اچرا' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getongoingdProject(@Req() req: any, @Res() res: any) {
    return this.appService.getOngoingProjectPage(req, res)
  }




  @Post('/project/GoodPractice/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه پروژه های در حال اچرا' })
  @ApiResponse({
    status: 200, description: 'set project page data',
    schema: {
      example: {
        success: true,
        message: 'set peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: completeProjectCreation,
    description: 'بادی برای اپدیت صفحه پروژه های در حال اچرا'
  })
  async GoodPracticeProject(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: completeProjectCreation) {
    return this.appService.setgoodPracticeProjectPage(req, res, body)
  }


  @Get('/project/GoodPractice')
  @ApiOperation({ summary: 'گت کردن دیتاهای صفحه پروژه های  ذر حال اچرا' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getGoodPracticedProject(@Req() req: any, @Res() res: any) {
    return this.appService.getgoodPracticeProjectPage(req, res)
  }



  @Post('/project/Collaboration/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه پروژه های فرصت های همکاری  ' })
  @ApiResponse({
    status: 200, description: 'set project page data',
    schema: {
      example: {
        success: true,
        message: 'set peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: completeProjectCreation,
    description: 'بادی برای اپدیت صفحه پروژه های   فرصت های همکاری'
  })
  async CollaborationProject(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: completeProjectCreation) {
    return this.appService.setcollaborationProjectPage(req, res, body)
  }



  @Post('/description/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه ها ' })
  @ApiResponse({
    status: 200, description: 'set pages data',
    schema: {
      example: {
        success: true,
        message: 'set  pages data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: pageDescriptionDto,
    description: 'بادی برای اپدیت صفحه ها  فرصت های همکاری'
  })
  async pagesDescription(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: pageDescriptionDto) {
    return this.appService.setPagesDescription(req, res, body)
  }



  @Post('/aboutus/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای صفحه درباره ما ' })
  @ApiResponse({
    status: 200, description: 'set about us pages data',
    schema: {
      example: {
        success: true,
        message: 'set about us pages data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: aboutUsDto,
    description: 'بادی برای اپدیت صفحه ها   درباره ما '
  })
  async setAboutUs(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: aboutUsDto) {
    return this.appService.setAboutUs(req, res, body)
  }



  @Post('/footer/create')
  @ApiOperation({ summary: 'ست کردن دیتاهای فوتر ' })
  @ApiResponse({
    status: 200, description: 'set footer data',
    schema: {
      example: {
        success: true,
        message: 'set footer data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  @ApiBody({
    type: setFooterDto,
    description: 'بادی برای ست کردن دیتای فوتر'
  })
  async setFooterData(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: setFooterDto) {
    return this.appService.setFooterData(req, res, body)
  }






  @Get('/footer')
  @ApiOperation({ summary: 'گت کردن دیتاهای فوتر ' })
  @ApiResponse({
    status: 200, description: 'get footer data',
    schema: {
      example: {
        success: true,
        message: 'get footer data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getFooterData(@Req() req: any, @Res() res: any) {
    return this.appService.getFooter(req, res)
  }




  @Get('/description/:pageName')
  @ApiOperation({ summary: 'گرفتن دیتاهای توضیحات صفحات بر اساس نام صفحه' })
  @ApiResponse({
    status: 200, description: 'get description page data',
    schema: {
      example: {
        success: true,
        message: 'get description page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getDescriptions(@Req() req: any, @Res() res: any, @Param('pageName') pageName: string) {
    return this.appService.getDescriptions(req, res, pageName)
  }




  @Get('/project/Collaboration')
  @ApiOperation({ summary: 'گت کردن دیتاهای صفحه پروژه های  فرصت های همکاری' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get peoject page data done',
        error: null,
        data: {},
        ngo: [],
      }
    }
  })
  async getCollaborationdProject(@Req() req: any, @Res() res: any) {
    return this.appService.getcollaborationProjectPage(req, res)
  }



  @Post('/file/delete')
  async deleteFiles(@Req() req: any, @Res() res: any, @Body() body: any) {
    return this.appService.deleteFile(req, res, body)
  }



  @Get('/aboutus')
  @ApiOperation({ summary: 'دیتاهای صفحه درباره ما' })
  @ApiResponse({
    status: 200, description: 'get about us page data',
    schema: {
      example: {
        success: true,
        message: 'get about us page data done',
        error: null,
        data: {}
      }
    }
  })
  async getaboutUsData(@Req() req: any, @Res() res: any) {
    return this.appService.aboutUs(req, res)
  }



  /**this is project page data */
  @Get('/projects')
  @ApiOperation({ summary: 'دیتاهای صفحه پروژه ها' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get project page data done',
        error: null,
        data: {
          ongoing: [],
          completed: [],
          goodPractice: [],
          collaborationOpportunities: [],
          lastProjects: [],
          mostParticipation: []
        }
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async getProjectPage(@Req() req: any, @Res() res: any) {
    return this.appService.projectPage(req, res)
  }



  /**this is project page data by category */
  @Get('/projects/all')
  @ApiOperation({ summary: 'گرفتن پروژه ها بر اساس دسته بندی' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get project page data done',
        error: null,
        data: {}
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async getSpecificProjects(@Req() req: any, @Res() res: any, @Query('status') status: string, @Query('page') page: string) {
    return this.appService.specificProjectsByStatus(req, res, status, +page)
  }



  /**this is project page data by category */
  @Get('/documents/all')
  @ApiOperation({ summary: 'گرفتن اسناد بر اساس دسته بندی' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get project page data done',
        error: null,
        data: {}
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async getDocuments(@Req() req: any, @Res() res: any, @Query('search') search: string, @Query('page') page: string) {
    return this.appService.getDocuments(req, res, +page, search)
  }


  /**this is project page data by category */
  @Get('/documents/:id')
  @ApiOperation({ summary: 'گرفتن اسناد بر اساس ای دی' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get project page data done',
        error: null,
        data: {}
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async searchDcuments(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return this.appService.searchDocument(req, res, id)
  }



  /**this is project page data by category */
  @Get('/projects/:id')
  @ApiOperation({ summary: 'گرفتن پروژه ها بر اساس ای دی ' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get project page data done',
        error: null,
        data: {}
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async getSpecificProject(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return this.appService.getSpecificProjectByID(req, res, id)
  }


  /**this is project page data by id */
  @Get('/project')
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiOperation({ summary: 'گرفتن پروژه ها بر اساس آی دی' })
  @ApiResponse({
    status: 200, description: 'get project page data',
    schema: {
      example: {
        success: true,
        message: 'get project page data done',
        error: null,
        data: {}
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async getSpecificProjectsById(@Req() req: any, @Res() res: any) {
    return this.appService.specificProjectsById(req, res)
  }


  /**
   * statistic page
   * @param req 
   * @param res 
   * @returns 
   */
  @Get('/statistic')
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiOperation({ summary: 'گرفتن  دیتای صفحه استاتیستیک' })
  @ApiResponse({
    status: 200, description: 'get statistic page data',
    schema: {
      example: {
        success: true,
        message: 'get statistic page data done',
        error: null,
        data: {}
      }
    },
  })
  @ApiResponse({
    status: 500, description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null
      }
    },
  })
  async getStatistic(@Req() req: any, @Res() res: any) {
    return this.appService.statisticPage(req, res)
  }



/////////////////////////final line!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
