import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Res } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { createDocumentsDto } from './dto/createdocument.dto';
import { createProject } from './dto/createProject.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ngo } from './entities/ngo.entity';


@Controller('ngo')
@ApiTags('ngo api')
export class NgoController {
  constructor(private readonly ngoService: NgoService) { }

  /**creation ngo api */
  @Post('/create')
  @ApiOperation({ summary: 'وقتی سمن ها میخان ثبت نام کنن' })
  @ApiResponse({
    status: 200, description: 'the ngos created successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created successfully',
        error: null,
        data: Ngo
      }
    },
  })
  // @ApiResponse({
  //   status: 403, description: 'Forbidden.',
  //   schema: {
  //     example: {
  //       success: false,
  //       message: 'the ngo creation failed',
  //       error: 'forbidden user',
  //       data: null
  //     }
  //   },
  // })
  @ApiResponse({
    status: 409, description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this ngo already has an account',
        error: 'duplicate account',
        data: null
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
  @ApiBody({
    type: CreateNgoDto,
    description: 'Json structure for ngo object',
  })
  create(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: CreateNgoDto) {
    return this.ngoService.createNewNgo(req, res, body)
  }




  /**creation api document */
  @Post('/document/create')
  @ApiOperation({ summary: 'وقتی سمن ها میخان سند ثبت کنن' })
  @ApiResponse({
    status: 200, description: 'the ngos created document successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created document successfully',
        error: null,
        data: Ngo
      }
    },
  })
  // @ApiResponse({
  //   status: 403, description: 'Forbidden.',
  //   schema: {
  //     example: {
  //       success: false,
  //       message: 'the ngo creation failed',
  //       error: 'forbidden user',
  //       data: null
  //     }
  //   },
  // })
  @ApiResponse({
    status: 409, description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this document already created',
        error: 'duplicate document',
        data: null
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
  @ApiBody({
    type: createDocumentsDto,
    description: 'Json structure for document object',
  })
  createDocument(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: createDocumentsDto) {
    return this.ngoService.createNewDocument(req, res, body)
  }


  /**this is creating project api */
  @Post('/project/create')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه ثبت کنن' })
  @ApiResponse({
    status: 200, description: 'the ngos created project successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created project successfully',
        error: null,
        data: Ngo
      }
    },
  })
  // @ApiResponse({
  //   status: 403, description: 'Forbidden.',
  //   schema: {
  //     example: {
  //       success: false,
  //       message: 'the ngo creation failed',
  //       error: 'forbidden user',
  //       data: null
  //     }
  //   },
  // })
  @ApiResponse({
    status: 409, description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this project already created',
        error: 'duplicate project',
        data: null
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
  @ApiBody({
    type: createProject,
    description: 'Json structure for project object',
  })
  createProject(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: createProject) {
    return this.ngoService.createNewProject(req, res, body)
  }



  /**this is ngo page api */
  @Get('/all')
  @ApiOperation({ summary: 'دیتای صفحه ی سمن ها به همراه دیتای نقشه' })
  @ApiResponse({
    status: 200, description: 'get all ngo succeed',
    schema: {
      example: {
        success: true,
        message: 'get all ngo succeed',
        error: null,
        data: { ngoTabel: [], mapNgo: [] }
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
  getAllNgo(@Req() req: any, @Res() res: any) {
    return this.ngoService.getAllNgo(req, res)
  }


  /**this is specific ngo api  */
  @Get('/:ngoId')
  @ApiOperation({ summary: 'گرفتن لوکیشن یک سمن خاص' })
  @ApiResponse({
    status: 200, description: 'get ngo succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo succeed',
        error: null,
        data: { ngo: {}, similarNgo: [] }
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
  @ApiParam({
    name: 'ngoId',
    example: '354963512685fasdf685165'
  })
  getspecificNgo(@Req() req: any, @Res() res: any, @Param('ngoId') ngoId: string) {
    return this.ngoService.getNgo(req, res, ngoId)
  }



  /**this is specific ngo api  */
  @Get('/info')
  @ApiOperation({ summary: 'گرفتن دیتای پنل یک سمن خاص' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get ngo pannel succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo paneel succeed',
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
  ngoPannel(@Req() req: any, @Res() res: any) {
    return this.ngoService.getNgoInfo(req, res)
  }



  /**this is specific ngo documents api  */
  @Get('/pannel/documents')
  @ApiOperation({ summary: 'گرفتن اسناد پنل یک سمن خاص' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get ngo documents succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo paneel succeed',
        error: null,
        data : []
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
  ngoDocuments(@Req() req: any, @Res() res: any) {
    return this.ngoService.getNgosDocument(req, res)
  }


  /**this is specific ngo projects api  */
  @Get('/pannel/projects')
  @ApiOperation({ summary: 'گرفتن پروژه های پنل یک سمن خاص' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: { ongoing: [], completed: [], goodPractice: [], collaborationOpportunities: [] }
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
  ngoProjects(@Req() req: any, @Res() res: any) {
    return this.ngoService.getNgoProjects(req, res)
  }





}
