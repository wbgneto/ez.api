import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Realtor} from "../realtors/realtor.entity";
import {Photo} from "../photos/photo.entity";
import {SeedsController} from "./seeds.controller";
import {Listing} from "../listings/listing.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Listing]),
        TypeOrmModule.forFeature([Realtor]),
        TypeOrmModule.forFeature([Photo])
    ],
    controllers: [SeedsController],
})
export class SeedsModule {
}