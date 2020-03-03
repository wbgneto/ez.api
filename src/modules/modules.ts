import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../../config/database.config';
import { RealtorsModule } from './realtors/realtors.module';
import {ListingsModule} from "./listings/listings.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    RealtorsModule,
    ListingsModule,
  ],
  controllers: [],
  providers: [],
})
export class Modules {}