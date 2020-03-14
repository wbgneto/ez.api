import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import {Listing} from "../listings/listing.entity";
import {Realtor} from "../realtors/realtor.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Realtor]), TypeOrmModule.forFeature([Listing])],
    controllers: [ReportsController]
})
export class ReportsModule {}