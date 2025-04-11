import { Body, Controller, Get, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';
import { homePage } from './dto/homePage.dto';


@ApiTags('pages data')
@Controller('page')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('uploadFile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture' , maxCount : 10 }] 
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
  })}))
  async upload( @Req() req , @Res() res, @UploadedFiles(
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
        data: {
          heroSectionPictures: ['https://thecsruniverse.com/adminxsafe/uploads/20231027105644', 'https://give.do/blog/wp-content/uploads/2023/08/The-role-of-the-education-NGO-in-India-enthusiastic-children-beneficiaries-education-classroom-preview.jpg'],
          midllepartPics: ['https://thecsruniverse.com/adminxsafe/uploads/20231027105644', 'https://thecsruniverse.com/adminxsafe/uploads/20231027105644', 'https://thecsruniverse.com/adminxsafe/uploads/20231027105644'],
          projects: [],
          aboutUsPicture: ['https://thecsruniverse.com/adminxsafe/uploads/20231027105644', 'https://thecsruniverse.com/adminxsafe/uploads/20231027105644'],
          aboutUsText: {
            boldPart: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            normalPart: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          },
          ngo: [],
        }
      }
    }    
  })
  async getHomeData(@Req() req: any, @Res() res: any) {
    return this.appService.homeData(req , res)
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
    type : homePage,
    description : 'بادی برای اپدیت صفحه هوم'
  })
  async setHomeData(@Req() req: any, @Res() res: any  , @Body(new ValidationPipe()) body : homePage) {
    return this.appService.setHomeData(req , res , body)
  }











  @Post('/file/delete')
  async deleteFiles(@Req() req: any, @Res() res: any , @Body() body : any){
      return this.appService.deleteFile(req , res , body)
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
        data: {
          title : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
          middlePartText : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
          middlePartPic : 'https://thecsruniverse.com/adminxsafe/uploads/20231027105644',
          missionAndGoal : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',  
        }
      }
    }    
  })
  async getaboutUsData(@Req() req: any, @Res() res: any) {
    return this.appService.aboutUs(req , res)
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
    return this.appService.projectPage(req , res)
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
  async getSpecificProjects(@Req() req: any, @Res() res: any , @Query('status') status : string , @Query('page') page : string) {
    return this.appService.specificProjectsByStatus(req , res , status , +page)
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
  async getDocuments(@Req() req: any, @Res() res: any , @Query('search') search : string , @Query('page') page : string ) {
    return this.appService.getDocuments(req , res , +page , search)
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
    async searchDcuments(@Req() req: any, @Res() res: any , @Param('id') id : string) {
      return this.appService.searchDocument(req , res , id)
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
  async getSpecificProject(@Req() req: any, @Res() res: any , @Param('id') id : string) {
    return this.appService.getSpecificProjectByID(req , res , id)
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
    return this.appService.specificProjectsById(req , res )
  }

  
}
