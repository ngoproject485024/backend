import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { NgoController } from './ngo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ngoSchema } from './entities/ngo.entity';
import { documentSchema } from './entities/document.entity';
import { projectSchema } from './entities/project.entity';
import { jwtService } from 'src/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsEducationsService } from 'src/events-educations/events-educations.service';
import { EducationSchema } from 'src/events-educations/entities/education.entity';
import { EventsSchema } from 'src/events-educations/entities/events.entity';
import { auth } from 'src/auth/auth.middleware';
import { pagesSchema } from 'src/entity/pages.entity';

@Module({
  imports : [MongooseModule.forRoot('') , 
      MongooseModule.forFeature([{name : 'educations' , schema : EducationSchema},{name : 'pages' , schema : pagesSchema} , {name : 'events' , schema : EventsSchema},{name : 'ngo' , schema : ngoSchema} , {name : 'document' , schema : documentSchema} , {name : 'project' , schema : projectSchema}]),
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: process.env.JWT_SECRET,
          }),
        }),
  ],
  controllers: [NgoController],
  providers: [NgoService , jwtService , EventsEducationsService],
})



export class NgoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).forRoutes({ path: '/ngo/document/create', method: RequestMethod.POST },
      { path: '/ngo/document/update/:id', method: RequestMethod.POST },
      { path: '/ngo/document/delete/:id', method: RequestMethod.POST },
      { path: '/ngo/project/create', method: RequestMethod.POST },
      { path: '/ngo/project/update/:id', method: RequestMethod.POST },
      { path: '/ngo/project/ongoing/:id', method: RequestMethod.POST },
      { path: '/ngo/project/delete/:id', method: RequestMethod.POST },  
      { path: '/ngo/project/complete/:projectId', method: RequestMethod.POST },
      { path: '/ngo/pannel/documents', method: RequestMethod.GET },
      { path: '/ngo/token/check', method: RequestMethod.GET },
      { path: '/ngo/pannel/projects', method: RequestMethod.GET })
  }
}



