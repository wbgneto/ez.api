import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Listing} from "../modules/listings/listing.entity";
import {Realtor} from "../modules/realtors/realtor.entity";
import {Feature} from "../modules/features/feature.entity";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {Address} from "../modules/addresses/address.entity";
import {Photo} from "../modules/photos/photo.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'ezrealtors',
    password: 'ezrealtors',
    database: 'ezrealtors',
    entities: [Listing, Realtor, Feature, Address, Photo],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
};