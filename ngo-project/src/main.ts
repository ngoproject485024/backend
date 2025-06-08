import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.enableCors({ origin: '*', // specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // specify the allowed HTTP methods
})
  process.on('unhandledRejection', (error) => {
    console.log('error occured . . .', error)
  });

  process.on('uncaughtException' , (error)=>{
    console.log('error occured' , error )
  })  

  process.on('unhandledException', (error) => {
    console.log('error occured . . .', error)
  })
  app.useGlobalPipes(new ValidationPipe({
    transform: true // Transform is recomended configuration for avoind issues with arrays of files transformations
  }));
  const options = new DocumentBuilder()
    .setTitle('ngo project')
    .setDescription('this is api documentation of ngo project')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://ngo.oceanjourney.ir/', 'Staging')
    .addServer('https://ngo.ir/', 'Production')
    .build();
  process.nextTick(()=>{
    console.log('next tick done')
  })
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
