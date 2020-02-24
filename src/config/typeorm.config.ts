import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { api_realtor } from '../modules/realtors/realtor.entity';
// import { api_address } from '../addresses/address.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'EZSystem',
    entities: [api_realtor],//[__dirname + '../**/*.entity.ts'],
    synchronize: false,
}