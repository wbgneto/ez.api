import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';

import { RealtorsController } from './realtors.controller';
import { RealtorsService } from './realtors.service';
import { RealtorSchema } from './realtor.model';

@Module({
    // imports: [TypeOrmModule.forFeature([{name: 'Realtor'}])],
    controllers: [RealtorsController],
    providers: [RealtorsService],
})
export class RealtorsModule {}