import { NestFactory } from '@nestjs/core';
import { Modules } from './modules/modules';
import {Logger, ValidationPipe} from '@nestjs/common';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(Modules, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
  Logger.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
}
bootstrap();
