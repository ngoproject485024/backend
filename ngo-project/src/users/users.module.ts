import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from 'src/events-educations/entities/education.entity';
import { pagesSchema } from 'src/entity/pages.entity';
import { EventsSchema } from 'src/events-educations/entities/events.entity';
import { ngoSchema } from 'src/ngo/entities/ngo.entity';
import { documentSchema } from 'src/ngo/entities/document.entity';
import { projectSchema } from 'src/ngo/entities/project.entity';

@Module({
  imports: [MongooseModule.forRoot(''),
  MongooseModule.forFeature([{ name: 'educations', schema: EducationSchema }, { name: 'pages', schema: pagesSchema }, { name: 'events', schema: EventsSchema }, { name: 'ngo', schema: ngoSchema }, { name: 'document', schema: documentSchema }, { name: 'project', schema: projectSchema }]),],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
