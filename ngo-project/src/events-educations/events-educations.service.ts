import { Injectable } from '@nestjs/common';
import { CreateEventsEducationDto } from './dto/create-events-education.dto';
import { UpdateEventsEducationDto } from './dto/update-events-education.dto';

@Injectable()
export class EventsEducationsService {
  create(createEventsEducationDto: CreateEventsEducationDto) {
    return 'This action adds a new eventsEducation';
  }

  findAll() {
    return `This action returns all eventsEducations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventsEducation`;
  }

  update(id: number, updateEventsEducationDto: UpdateEventsEducationDto) {
    return `This action updates a #${id} eventsEducation`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventsEducation`;
  }
}
