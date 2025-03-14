import { Module } from '@nestjs/common';
import { EventsEducationsService } from './events-educations.service';
import { EventsEducationsController } from './events-educations.controller';

@Module({
  controllers: [EventsEducationsController],
  providers: [EventsEducationsService],
})
export class EventsEducationsModule {}
