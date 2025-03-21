import { Module } from '@nestjs/common';
import { EventsEducationsService } from './events-educations.service';
import { EventsEducationsController } from './events-educations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from './entities/education.entity';
import { EventsSchema } from './entities/events.entity';

@Module({
  imports:[MongooseModule.forFeature([{name : 'educations' , schema : EducationSchema} , {name : 'events' , schema : EventsSchema}])],
  controllers: [EventsEducationsController],
  providers: [EventsEducationsService],
})

export class EventsEducationsModule {}
