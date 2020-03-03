import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realtor } from './realtor.entity';

import { RealtorsController } from './realtors.controller';
import { RealtorsService } from './realtors.service';


@Module({
    imports: [TypeOrmModule.forFeature([Realtor])],
    controllers: [RealtorsController],
    providers: [RealtorsService],
})
export class RealtorsModule {}