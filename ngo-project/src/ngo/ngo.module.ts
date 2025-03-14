import { Module } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { NgoController } from './ngo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ngoSchema } from './entities/ngo.entity';
import { documentSchema } from './entities/document.entity';
import { projectSchema } from './entities/project.entity';

@Module({
  imports : [MongooseModule.forRoot('') , 
      MongooseModule.forFeature([{name : 'ngo' , schema : ngoSchema} , {name : 'document' , schema : documentSchema} , {name : 'project' , schema : projectSchema}])
  ],
  controllers: [NgoController],
  providers: [NgoService],
})
export class NgoModule {}
