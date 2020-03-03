import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from "./feature.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Feature])],
    controllers: [],
})
export class FeaturesModule {}