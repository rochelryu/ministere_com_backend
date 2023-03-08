import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
const logger = new Logger('Main');
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.use(compression());
  app.useStaticAssets(join(__dirname, '../static/assets')); // static File Folder
  /*app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');*/
  app.use(bodyParser.json({ limit: '100mb' })); // enable bodyParser with great Limit
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // encoded bodyParser with great Limit
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Ministère Documentation')
    .setDescription('The mini API description')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Hobbies')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.APP_PORT.toString(), () => {
    logger.verbose(
      `HTTP SERVICE READY... ${process.env.APP_HOST}:${process.env.APP_PORT}`,
    );
  });
}
bootstrap();
