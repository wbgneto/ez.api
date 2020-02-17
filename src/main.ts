import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

//To do the validation 
import { registerSchema } from 'class-validator';
import { realtorValidationSchema } from './realtors/realtor.pipe';
registerSchema(realtorValidationSchema);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  Logger.log(`Server is running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
