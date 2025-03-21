import { Module } from '@nestjs/common';
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

@Module({
  imports : [MongooseModule.forRoot('') , 
      MongooseModule.forFeature([{name : 'educations' , schema : EducationSchema} , {name : 'events' , schema : EventsSchema},{name : 'ngo' , schema : ngoSchema} , {name : 'document' , schema : documentSchema} , {name : 'project' , schema : projectSchema}]),
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
export class NgoModule {}
