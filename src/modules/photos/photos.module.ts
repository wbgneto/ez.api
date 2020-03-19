import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';

import { PhotosController } from './photos.controller';
import { Listing } from '../listings/listing.entity';
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports: [TypeOrmModule.forFeature([Photo]), TypeOrmModule.forFeature([Listing]), MulterModule.register({ dest:'./uploads'})],
    controllers: [PhotosController]
})


export class PhotosModule {}