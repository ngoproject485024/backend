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



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: 'config.env' }), MulterModule.register({ dest: './ngo-uploads' }),
  MongooseModule.forRoot('mongodb+srv://ngoProject:ngo25255225@cluster0.qvlj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  MongooseModule.forFeature([{ name: 'ngo', schema: ngoSchema }, { name: 'document', schema: documentSchema }, { name: 'project', schema: projectSchema }]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: process.env.JWT_SECRET,
    }),
  })
    , NgoModule, EventsEducationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, jwtService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(auth).forRoutes({path : '/ngo/document/create' , method : RequestMethod.POST} , 
        {path : '/ngo/project/create' , method : RequestMethod.POST})
  }
}
