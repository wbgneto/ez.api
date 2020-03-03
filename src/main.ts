import { NestFactory } from '@nestjs/core';
import { Modules } from './modules/modules';
import {Logger, ValidationPipe} from '@nestjs/common';

//To do the validation 
import { registerSchema } from 'class-validator';
import { realtorValidationSchema } from './modules/realtors/realtor.pipe';
registerSchema(realtorValidationSchema);

async function bootstrap() {
  const app = await NestFactory.create(Modules);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  Logger.log(`Server is running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
