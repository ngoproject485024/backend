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

@Module({
  imports : [MongooseModule.forRoot('') , 
      MongooseModule.forFeature([{name : 'ngo' , schema : ngoSchema} , {name : 'document' , schema : documentSchema} , {name : 'project' , schema : projectSchema}]),
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: process.env.JWT_SECRET,
          }),
        }),
  ],
  controllers: [NgoController],
  providers: [NgoService , jwtService],
})
export class NgoModule {}
