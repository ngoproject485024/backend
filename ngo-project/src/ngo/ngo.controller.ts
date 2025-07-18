import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { NgoService } from './ngo.service';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { createDocumentsDto } from './dto/createdocument.dto';
import { createProject } from './dto/createProject.dto';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Ngo } from './entities/ngo.entity';
import { loginDTO } from './dto/login.dto';
import { completeProject } from './dto/completeProject.dto';
import { responseInterface } from 'src/interfaces/interfaces.interface';

@Controller('ngo')
@ApiTags('ngo api')
export class NgoController {
  constructor(private readonly ngoService: NgoService) {}

  /**creation ngo api */
  @Post('/create')
  @ApiOperation({ summary: 'وقتی سمن ها میخان ثبت نام کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this ngo already has an account',
        error: 'duplicate account',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: CreateNgoDto,
    description: 'Json structure for ngo object',
  })
  create(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe()) body: CreateNgoDto,
  ): Promise<responseInterface> {
    return this.ngoService.createNewNgo(req, res, body);
  }


  
  @Post('/login')
  @ApiOperation({ summary: 'وقتی سمن ها میخان وارد بشن به اکانتشون' })
  @ApiResponse({
    status: 200,
    description: 'the ngos login successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo login successfully',
        error: null,
        data: {
          username: 'a;dsfkja',
          name: 'a;slkfjma;f',
          token: 'as;dfilkjm;lkfamsd;lkfmas;ldfjk',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
    schema: {
      example: {
        success: false,
        message: 'the ngo login failed',
        error: 'wrong password',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: loginDTO,
    description: 'Json structure for ngo object',
  })
  login(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe()) body: loginDTO,
  ): Promise<responseInterface> {
    return this.ngoService.login(req, res, body);
  }

  /**creation api document */
  @Post('/document/create')
  @ApiOperation({ summary: 'وقتی سمن ها میخان سند ثبت کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created document successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created document successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this document already created',
        error: 'duplicate document',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: createDocumentsDto,
    description: 'Json structure for document object',
  })
  createDocument(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe()) body: createDocumentsDto,
  ): Promise<responseInterface> {
    return this.ngoService.createNewDocument(req, res, body);
  }

  /**this is creating project api */
  @Post('/document/update/:id')
  @ApiOperation({ summary: 'وقتی سمن ها میخان اسناد رو آپدیت کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created document successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created document successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this document already updated',
        error: 'duplicate document',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: createDocumentsDto,
    description: 'Json structure for project object',
  })
  updatedocument(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe()) body: createDocumentsDto,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.updateDocument(req, res, body, id);
  }

  /**this is creating project api */
  @Post('/document/delete/:id')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه رو حذف کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created Documents successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created Documents successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this Documents already created',
        error: 'duplicate Documents',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  deleteDocuments(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.deleteDocuments(req, res, id);
  }

  /**this is creating project api */
  @Post('/project/create')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه ثبت کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created project successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created project successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this project already created',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: createProject,
    description: 'Json structure for project object',
  })
  createProject(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe()) body: createProject,
  ): Promise<responseInterface> {
    return this.ngoService.createNewProject(req, res, body);
  }

  /**this is creating project api */
  @Post('/project/update/:id')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه رو آپدیت کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created project successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created project successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this project already created',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: createProject,
    description: 'Json structure for project object',
  })
  updateProject(
    @Req() req: any,
    @Res() res: any,
    @Body(new ValidationPipe()) body: createProject,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.updateProject(req, res, body, id);
  }

  /**this is creating project api */
  @Post('/project/complete/:projectId')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه رو به اتمام برسونن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created project successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo updated project successfully',
        error: null,
        data: {},
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this project already cpmpleted',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiBody({
    type: completeProject,
    description: 'Json structure for project object',
  })
  completeProject(
    @Req() req: any,
    @Res() res: any,
    @Param('projectId') projectId: string,
    @Body(new ValidationPipe()) body: completeProject,
  ): Promise<responseInterface> {
    return this.ngoService.completeProject(req, res, projectId, body);
  }

  /**this is creating project api */
  @Post('/project/delete/:id')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه رو حذف کنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos created project successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo created project successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this project already created',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  deleteProject(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.deleteProject(req, res, id);
  }

  /**this is creating project api */
  @Post('/project/ongoing/:id')
  @ApiOperation({ summary: 'وقتی سمن ها میخان پروژه رو استارت بزنن' })
  @ApiResponse({
    status: 200,
    description: 'the ngos update project successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo update project successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'this project already update',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ongoingProject(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.ongoing(req, res, id);
  }

  /**this is creating project api */
  @Post('/approved/:ngoId')
  @ApiOperation({ summary: 'تایید سمن ها توسط ادمین' })
  @ApiResponse({
    status: 200,
    description: 'the ngo approved successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo approved successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'the ngo already approved',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  async approvedNgo(
    @Req() req: any,
    @Res() res: any,
    @Param('ngoId') ngoId: string,
  ): Promise<responseInterface> {
    return this.ngoService.approvedNgo(req, res, ngoId);
  }

  /**this is creating project api */
  @Post('/reject/:ngoId')
  @ApiOperation({ summary: 'رد سمن ها توسط ادمین' })
  @ApiResponse({
    status: 200,
    description: 'the ngo approved successfully',
    schema: {
      example: {
        success: true,
        message: 'the ngo approved successfully',
        error: null,
        data: Ngo,
      },
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
    status: 409,
    description: 'duplicate data',
    schema: {
      example: {
        success: false,
        message: 'the ngo already approved',
        error: 'duplicate project',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  async rejectNgoProject(
    @Req() req: any,
    @Res() res: any,
    @Param('ngoId') ngoId: string,
  ): Promise<responseInterface> {
    return this.ngoService.rejectNgo(req, res, ngoId);
  }

  /**this is ngo page api */
  @Get('/all')
  @ApiOperation({ summary: 'دیتای صفحه ی سمن ها به همراه دیتای نقشه' })
  @ApiResponse({
    status: 200,
    description: 'get all ngo succeed',
    schema: {
      example: {
        success: true,
        message: 'get all ngo succeed',
        error: null,
        data: { ngoTabel: [], mapNgo: [] },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  getAllNgo(@Req() req: any, @Res() res: any): Promise<responseInterface> {
    return this.ngoService.getAllNgo(req, res);
  }

  /**this is specific ngo api  */
  @Get('/:ngoId')
  @ApiOperation({ summary: ' گرفتن دیتای یک سمن خاص از توی صفحه ی سمن ها' })
  @ApiResponse({
    status: 200,
    description: 'get ngo succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo succeed',
        error: null,
        data: { ngo: {}, similarNgo: [] },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  @ApiParam({
    name: 'ngoId',
    example: '354963512685fasdf685165',
  })
  getspecificNgo(
    @Req() req: any,
    @Res() res: any,
    @Param('ngoId') ngoId: string,
  ): Promise<responseInterface> {
    return this.ngoService.getNgo(req, res, ngoId);
  }

  /**this is specific ngo api  */
  @Get('/info')
  @ApiOperation({ summary: 'گرفتن دیتای پنل یک سمن خاص' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo pannel succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo paneel succeed',
        error: null,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoPannel(@Req() req: any, @Res() res: any): Promise<responseInterface> {
    return this.ngoService.getNgoInfo(req, res);
  }

  /**this is specific ngo documents api  */
  @Get('/pannel/documents')
  @ApiOperation({ summary: 'گرفتن اسناد پنل یک سمن خاص' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo documents succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo paneel succeed',
        error: null,
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoDocuments(@Req() req: any, @Res() res: any): Promise<responseInterface> {
    return this.ngoService.getNgosDocument(req, res);
  }

  /**this is specific ngo documents api  */
  @Put('/document/approve/:id')
  @ApiOperation({ summary: 'تایید یا رد یک ادمین خاص' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'approve or reject ngo documents succeed',
    schema: {
      example: {
        success: true,
        message: 'approve ngo document succeed',
        error: null,
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  approveDocument(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
    @Query('state') state: number,
  ): Promise<responseInterface> {
    return this.ngoService.approveDocumentByAdmin(req, res, id, +state);
  }

  /**this is specific ngo documents api  */
  @Put('/project/approve/:id')
  @ApiOperation({ summary: 'تایید یا رد یک پروژه خاص' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'approve or reject ngo documents succeed',
    schema: {
      example: {
        success: true,
        message: 'approve ngo document succeed',
        error: null,
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  approveProject(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
    @Query('state') state: number,
  ): Promise<responseInterface> {
    return this.ngoService.approveProjectByAdmin(req, res, id, +state);
  }

  /**this is specific ngo documents api  */
  @Get('/admin/documents')
  @ApiOperation({ summary: 'گرفتن اسناد توسط ادمین در پنل ادمین' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo documents succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo paneel succeed',
        error: null,
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoDocumentsByAdmin(
    @Req() req: any,
    @Res() res: any,
  ): Promise<responseInterface> {
    return this.ngoService.getNgosDocumentByAdmin(req, res);
  }

  /**this is specific ngo projects api  */
  @Get('/pannel/projects')
  @ApiOperation({ summary: 'گرفتن پروژه های پنل یک سمن خاص' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: {
          ongoing: [],
          completed: [],
          goodPractice: [],
          collaborationOpportunities: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoProjects(@Req() req: any, @Res() res: any): Promise<responseInterface> {
    return this.ngoService.getNgoProjects(req, res);
  }

  /**this is specific ngo projects api  */
  @Get('/admin/projects')
  @ApiOperation({ summary: 'گرفتن پروژه ها توسط ادمین' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: {
          ongoing: [],
          completed: [],
          goodPractice: [],
          collaborationOpportunities: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoProjectsByAdmin(
    @Req() req: any,
    @Res() res: any,
  ): Promise<responseInterface> {
    return this.ngoService.getNgoProjectsByAdmin(req, res);
  }

  /**this is specific ngo projects api  */
  @Get('/admin/projects/:id')
  @ApiOperation({ summary: 'گرفتن پروژه توسط ادمین' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoProjectByAdmin(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.getNgoProjectByAdmin(req, res, id);
  }

  /**this is specific ngo projects api  */
  @Get('/admin/ngo')
  @ApiOperation({ summary: 'گرفتن دیتاهای مربوط به همه ی سمن هاتوسط ادمین' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: {
          ongoing: [],
          completed: [],
          goodPractice: [],
          collaborationOpportunities: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngosByAdmin(@Req() req: any, @Res() res: any): Promise<responseInterface> {
    return this.ngoService.getNgosData(req, res);
  }

  /**this is specific ngo projects api  */
  @Get('/admin/ngo/:id')
  @ApiOperation({ summary: 'گرفتن دیتاهای مربوط به یک سمن توسط ادمین' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: {
          ongoing: [],
          completed: [],
          goodPractice: [],
          collaborationOpportunities: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoDataByAdmin(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.getNgoData(req, res, id);
  }

  /**this is specific ngo projects api  */
  @Put('/disable/:id')
  @ApiOperation({ summary: 'دیسیبل و یا فعال کردن یک سمن توسط ادمین' })
  @ApiHeader({
    name: 'Authorization',
    example:
      'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi',
  })
  @ApiResponse({
    status: 200,
    description: 'get ngo projects succeed',
    schema: {
      example: {
        success: true,
        message: 'get ngo projects succeed',
        error: null,
        data: {
          ongoing: [],
          completed: [],
          goodPractice: [],
          collaborationOpportunities: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'internal service error',
    schema: {
      example: {
        success: false,
        message: 'internal error',
        error: 'internal service error',
        data: null,
      },
    },
  })
  ngoDesableByAdmin(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<responseInterface> {
    return this.ngoService.disableNgoData(req, res, id);
  }

  @Get('/gmail/approve')
  async approveGmail(
    @Req() req: any,
    @Res() res: any,
    @Query('token') token: string,
  ): Promise<responseInterface> {
    return this.ngoService.approveGmail(req, res, token);
  }

  @Get('/token/check')
  checkToken(@Req() req: any, @Res() res: any): Promise<responseInterface> {
    return this.ngoService.checkToken(req, res);
  }
}
