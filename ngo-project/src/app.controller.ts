import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pages data')
@Controller('page')
export class AppController {
  constructor(private readonly appService: AppService) { }



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
  @Get('/project/:status')
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
  async getSpecificProjects(@Req() req: any, @Res() res: any , @Param('status') status : string) {
    return this.appService.specificProjectsByStatus(req , res , status)
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
