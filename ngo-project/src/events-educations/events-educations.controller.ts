import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsEducationsService } from './events-educations.service';
import { CreateEventsEducationDto } from './dto/create-events-education.dto';
import { UpdateEventsEducationDto } from './dto/update-events-education.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('events-educations')
@ApiTags('events and educations')
export class EventsEducationsController {
  constructor(private readonly eventsEducationsService: EventsEducationsService) {}

  @Post()
  create(@Body() createEventsEducationDto: CreateEventsEducationDto) {
    return this.eventsEducationsService.create(createEventsEducationDto);
  }

  @Get()
  findAll() {
    return this.eventsEducationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsEducationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventsEducationDto: UpdateEventsEducationDto) {
    return this.eventsEducationsService.update(+id, updateEventsEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsEducationsService.remove(+id);
  }
}
