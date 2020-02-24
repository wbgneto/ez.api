import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Listing} from "./listing.entity";
import {ListingsController} from "./listings.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Listing])],
    controllers: [ListingsController],
})
export class ListingsModule {}