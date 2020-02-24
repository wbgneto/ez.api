import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Realtor } from '../modules/realtors/realtor.entity';
import {Listing} from "../modules/listings/listing.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'ezrealtors',
    password: 'ezrealtors',
    database: 'ezrealtors',
    entities: [Realtor, Listing],//[__dirname + '../**/*.entity.ts'],
    synchronize: true,
};