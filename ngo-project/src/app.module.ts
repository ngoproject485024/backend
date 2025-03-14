import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NgoModule } from './ngo/ngo.module';
import { EventsEducationsModule } from './events-educations/events-educations.module';
import { ngoSchema } from './ngo/entities/ngo.entity';
import { documentSchema } from './ngo/entities/document.entity';
import { projectSchema } from './ngo/entities/project.entity';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ngoProject:ngo25255225@cluster0.qvlj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') , 
         MongooseModule.forFeature([{name : 'ngo' , schema : ngoSchema} , {name : 'document' , schema : documentSchema} , {name : 'project' , schema : projectSchema}])
       , NgoModule, EventsEducationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
