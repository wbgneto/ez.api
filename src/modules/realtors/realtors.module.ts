import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { api_realtor } from '../realtors/realtor.entity';

import { RealtorsController } from './realtors.controller';
import { RealtorsService } from './realtors.service';


@Module({
    imports: [TypeOrmModule.forFeature([api_realtor])],
    controllers: [RealtorsController],
    providers: [RealtorsService],
})
export class RealtorsModule {}