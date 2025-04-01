import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from 'src/events-educations/entities/education.entity';
import { EventsSchema } from 'src/events-educations/entities/events.entity';
import { ngoSchema } from 'src/ngo/entities/ngo.entity';
import { documentSchema } from 'src/ngo/entities/document.entity';
import { projectSchema } from 'src/ngo/entities/project.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminSchema } from './entities/admin.entity';
import { jwtService } from 'src/jwt/jwt.service';
import { adminAuth } from 'src/admin-auth/admin-auth.middleware';


@Module({
  imports: [
    , MongooseModule.forRoot(''),
    MongooseModule.forFeature([{ name: 'educations', schema: EducationSchema },
    { name: 'admin', schema: AdminSchema },
    { name: 'events', schema: EventsSchema }, { name: 'ngo', schema: ngoSchema }, { name: 'document', schema: documentSchema }, { name: 'project', schema: projectSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, jwtService],
})

export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(adminAuth).forRoutes({ path: '/token/check', method: RequestMethod.GET },
    )
  }
}
