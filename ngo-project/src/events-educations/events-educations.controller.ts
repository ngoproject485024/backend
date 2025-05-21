import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, ValidationPipe, Query } from '@nestjs/common';
import { EventsEducationsService } from './events-educations.service';
// import { UpdateEventsEducationDto } from './dto/update-events-education.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateEvetsDto } from './dto/events.dto';

@Controller('events-educations')
@ApiTags('events and educations')
export class EventsEducationsController {
  constructor(private readonly eventsEducationsService: EventsEducationsService) { }


  @Post('/education/create')
  @ApiOperation({ summary: 'ساخت اموزش توسط ادمین' })
  @ApiResponse({
    status: 200, description: 'the ADMIN craete education successfully',
    schema: {
      example: {
        success: true,
        message: 'the admin created education successfully',
        error: null,
        data: {}
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
        message: 'this education already created',
        error: 'duplicate education',
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
    type: CreateEducationDto,
    description: 'Json structure for project object',
  })
  async createNewEducation(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: CreateEducationDto) {
    return this.eventsEducationsService.createNewEducation(req, res, body)
  }


  @Post('/education/update/:id')
  @ApiOperation({ summary: 'اپدیت اموزش توسط ادمین' })
  @ApiResponse({
    status: 200, description: 'the ADMIN craete education successfully',
    schema: {
      example: {
        success: true,
        message: 'the admin created education successfully',
        error: null,
        data: {}
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
        message: 'this education already created',
        error: 'duplicate education',
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
    type: CreateEducationDto,
    description: 'Json structure for project object',
  })
  async updateEducation(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: any, @Param('id') id: string) {
    return this.eventsEducationsService.updateEducation(req, res, body, id)
  }

  @Post('/event/create')
  @ApiOperation({ summary: 'ساخت رویداد توسط ادمین' })
  @ApiResponse({
    status: 200, description: 'the ADMIN craete events successfully',
    schema: {
      example: {
        success: true,
        message: 'the admin created events successfully',
        error: null,
        data: {}
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
        message: 'this events already created',
        error: 'duplicate evets',
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
    type: CreateEvetsDto,
    description: 'Json structure for events object',
  })
  async createNewEvents(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: CreateEvetsDto) {
    return this.eventsEducationsService.createNewEvents(req, res, body)
  }


  @Post('/event/update/:id')
  @ApiOperation({ summary: 'اپدیت رویداد توسط ادمین' })
  @ApiResponse({
    status: 200, description: 'the ADMIN craete events successfully',
    schema: {
      example: {
        success: true,
        message: 'the admin created events successfully',
        error: null,
        data: {}
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
        message: 'this events already created',
        error: 'duplicate evets',
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
    type: CreateEvetsDto,
    description: 'Json structure for events object',
  })
  async updateEvent(@Req() req: any, @Res() res: any, @Body(new ValidationPipe()) body: any, @Param('id') id: string) {
    return this.eventsEducationsService.updateEvent(req, res, body, id)
  }



  @Post('/event/delete/:id')
  @ApiOperation({ summary: 'حذف رویداد توسط ادمین' })
  @ApiResponse({
    status: 200, description: 'the ADMIN craete events successfully',
    schema: {
      example: {
        success: true,
        message: 'the admin created events successfully',
        error: null,
        data: {}
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
        message: 'this events already created',
        error: 'duplicate evets',
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
    type: CreateEvetsDto,
    description: 'Json structure for events object',
  })
  async delete(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return this.eventsEducationsService.deleteEvent(req, res, id)
  }


  @Post('/education/delete/:id')
  @ApiOperation({ summary: 'حذف رویداد توسط ادمین' })
  @ApiResponse({
    status: 200, description: 'the ADMIN craete events successfully',
    schema: {
      example: {
        success: true,
        message: 'the admin created events successfully',
        error: null,
        data: {}
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
        message: 'this events already created',
        error: 'duplicate evets',
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
    type: CreateEvetsDto,
    description: 'Json structure for events object',
  })
  async deleteEducation(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return this.eventsEducationsService.deleteEducation(req, res, id)
  }


  @Get('/education/all')
  @ApiOperation({ summary: 'گرفتن تمام اموزش ها از سمت وب سایت' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get all educations succeed',
    schema: {
      example: {
        success: true,
        message: 'get all educations succeed',
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
  async getAllEducations(@Req() req: any, @Res() res: any, @Query('type') type: string,@Query('page') page: string, @Query('sort') sort: string) {
    return this.eventsEducationsService.getAllEducations(req, res, type, sort , page)
  }


  @Get('/event/all')
  @ApiOperation({ summary: 'گرفتن تمام رویداد ها از سمت وب سایت' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get all educations succeed',
    schema: {
      example: {
        success: true,
        message: 'get all educations succeed',
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
  async getAllEvents(@Req() req: any, @Res() res: any, @Query('type') type: string, @Query('sort') sort: string,@Query('page') page: string, @Query('start') start: string, @Query('end') end: string) {
    return this.eventsEducationsService.getAllEvents(req, res, type, sort, start, end , page)
  }


  @Get('/education/:educationId')
  @ApiOperation({ summary: 'گرفتن یک اموزش خاص' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get specific educations succeed',
    schema: {
      example: {
        success: true,
        message: 'get specific educations succeed',
        error: null,
        data: {
          educations: [{}],
          similar: [{}]
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
  async getSpecificEducation(@Req() req: any, @Res() res: any, @Param('educationId') educationId: string) {
    return this.eventsEducationsService.getSpecificEducation(req, res, educationId)
  }


  @Get('/event/:eventId')
  @ApiOperation({ summary: 'گرفتن یک رویداد خاص توسط کاربر' })
  @ApiHeader({ name: 'Authorization', example: 'a;sdlfknoifja;slfjkdkas;caldifjkaklsd;fiwo;fjaks;dcmczxcoiasdljfkladsmcka;difjakl;sdfi' })
  @ApiResponse({
    status: 200, description: 'get specific event succeed',
    schema: {
      example: {
        success: true,
        message: 'get specific event succeed',
        error: null,
        data: {
          events: [{}],
          similar: [{}]
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
  async getSpecificEvents(@Req() req: any, @Res() res: any, @Param('eventId') eventId: string) {
    return this.eventsEducationsService.getSpecificEvents(req, res, eventId)
  }
}
