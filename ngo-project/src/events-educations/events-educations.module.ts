import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EventsEducationsService } from './events-educations.service';
import { EventsEducationsController } from './events-educations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from './entities/education.entity';
import { EventsSchema } from './entities/events.entity';
import { adminAuth } from 'src/admin-auth/admin-auth.middleware';

@Module({
  imports:[MongooseModule.forFeature([{name : 'educations' , schema : EducationSchema} , {name : 'events' , schema : EventsSchema}])],
  controllers: [EventsEducationsController],
  providers: [EventsEducationsService],
})

export class EventsEducationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
        consumer.apply(adminAuth).forRoutes({path : '/education/create' , method : RequestMethod.POST} ,
          {path : '/event/create' , method : RequestMethod.POST} ,
          // {path : '/education/create' , method : RequestMethod.POST}  
          // {path : '' , method : RequestMethod.POST},
          // {path : '' , method : RequestMethod.GET},
          // {path : '' , method : RequestMethod.GET})
    )}
}
