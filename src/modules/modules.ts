import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { RealtorsModule } from './realtors/realtors.module';
import {ListingsModule} from "./listings/listings.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RealtorsModule,
    ListingsModule,
  ],
  controllers: [],
  providers: [],
})
export class Modules {}