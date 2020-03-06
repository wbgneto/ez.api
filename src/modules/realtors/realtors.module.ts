import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realtor } from './realtor.entity';

import { RealtorsController } from './realtors.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Realtor])],
    controllers: [RealtorsController]
})
export class RealtorsModule {}