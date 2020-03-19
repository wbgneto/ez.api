import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFiles, UseInterceptors, Req, Res, HttpStatus} from '@nestjs/common';
import {Photo} from "./photo.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, Connection, createConnection, getRepository, getConnection} from "typeorm";
import { ListingRepository } from '../listings/listing.repository';
import {getCustomRepository} from "typeorm";
import {FilesInterceptor, FileFieldsInterceptor, AnyFilesInterceptor} from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes } from '@nestjs/swagger';



@Controller('photos')
export class PhotosController {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        private readonly listingRepository: ListingRepository,
    ) {
        this.listingRepository = getCustomRepository(ListingRepository);
    } 

    @Get()
    findAll() {
        return this.photoRepository.find();
    }

    @Get()
    findByListing(@Param('listingId') listingId: number) {
        return this.photoRepository.find({ where: { listing: listingId } });
    }


    // @Post('upload')
    // @UseInterceptors(FilesInterceptor('files[]', 20))
    // UploadFiles(@UploadedFiles() images, @Body() data){
    //     console.log(images);
    //     console.log(data.filename);
    //     return 'Done';

    // }
    // @Post('upload')
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'avatar', maxCount: 1 },
    //     { name: 'background', maxCount: 1 },
    // ]))
    // uploadFile(@UploadedFiles() files) {
    //     console.log(files);
    // }
    // @Post('upload')
    // @UseInterceptors(AnyFilesInterceptor())
    // UploadFile(@UploadedFiles() files) {
    //     console.log(files);
    // }
@Post()
@UseInterceptors(FilesInterceptor('image'))
uploadFile(@UploadedFiles() file) {
    console.log(file);
}


@Get(':imgpath')
seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads'});
}

    // @Post()
    // async create(
    //     // @FormData('listing_id') listingId: number,
    //     @Body('listing_id') listingId: number,
    //     @Body('path') path: string,
    //     @Body('title') title: string
    // ) {
        
    //     let listing = await this.listingRepository.findOrFail(listingId);

    //     // Add photo to listing
    //     let photo = new Photo();
    //     photo.path = path;
    //     photo.title = title;
    //     listing.photos.push(photo);

    //     // save listing
    //     await this.listingRepository.save(listing);
    // }


  
}