import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RealtorsModule } from './realtors/realtors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RealtorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
