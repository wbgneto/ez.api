import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Listing} from "../src/modules/listings/listing.entity";
import {Realtor} from "../src/modules/realtors/realtor.entity";
import {Feature} from "../src/modules/features/feature.entity";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {Address} from "../src/modules/addresses/address.entity";
import {Photo} from "../src/modules/photos/photo.entity";

require('dotenv').config();

export const database: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Listing, Realtor, Feature, Address, Photo],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
};