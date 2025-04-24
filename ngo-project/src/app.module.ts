import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NgoModule } from './ngo/ngo.module';
import { EventsEducationsModule } from './events-educations/events-educations.module';
import { ngoSchema } from './ngo/entities/ngo.entity';
import { documentSchema } from './ngo/entities/document.entity';
import { projectSchema } from './ngo/entities/project.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config'
import { jwtService } from './jwt/jwt.service';
import { MulterModule } from '@nestjs/platform-express';
import { auth } from './auth/auth.middleware';
import { AdminModule } from './admin/admin.module';
import { EventsEducationsService } from './events-educations/events-educations.service';
import { EventsSchema } from './events-educations/entities/events.entity';
import { EducationSchema } from './events-educations/entities/education.entity';
import { EventsEducationsController } from './events-educations/events-educations.controller';
import { adminAuth } from './admin-auth/admin-auth.middleware';
import { pagesSchema } from './entity/pages.entity';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: 'config.env' }), MulterModule.register({ dest: './ngo-uploads' }),
  MongooseModule.forRoot('mongodb+srv://ngoProject:ngo25255225@cluster0.qvlj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  MongooseModule.forFeature([{ name: 'ngo', schema: ngoSchema }
    , { name: 'educations', schema: EducationSchema }
    , { name: 'events', schema: EventsSchema }
    , { name: 'document', schema: documentSchema }
    , { name: 'project', schema: projectSchema }
    , { name: 'pages', schema: pagesSchema }
  ]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      // secret: process.env.JWT_SECRET,
      global: true
    }),
  })
    , NgoModule, EventsEducationsModule, AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, jwtService, EventsEducationsService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(adminAuth).forRoutes({ path: '/events-educations/education/create', method: RequestMethod.POST },
      { path: '/events-educations/event/create', method: RequestMethod.POST },
      { path: '/events-educations/education/all', method: RequestMethod.GET },
      { path: '/events-educations/devent/all', method: RequestMethod.GET },
      { path: '/events-educations/education/:educationId', method: RequestMethod.GET },
      { path: '/events-educations/event/:eventId', method: RequestMethod.GET },
      { path: '/events-educations/event/create', method: RequestMethod.POST },
      { path: '/page/home/create', method: RequestMethod.POST },
      { path: '/page/project/complete/create', method: RequestMethod.POST },
      { path: '/page/project/ongoing/create', method: RequestMethod.POST },
      { path: '/page/project/GoodPractice/create', method: RequestMethod.POST },
      { path: '/page/project/Collaboration/create', method: RequestMethod.POST },
      { path: '/page/description/create', method: RequestMethod.POST },
      { path: '/page/aboutus/create', method: RequestMethod.POST },
      { path: '/page/footer/create', method: RequestMethod.POST },
      // { path: '/page/footer', method: RequestMethod.GET},
    )
  }
}
