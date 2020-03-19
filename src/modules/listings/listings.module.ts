import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Listing} from "./listing.entity";
import {ListingsController} from "./listings.controller";
import {Realtor} from "../realtors/realtor.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Listing]), TypeOrmModule.forFeature([Realtor])],
    controllers: [ListingsController],
})
export class ListingsModule {}