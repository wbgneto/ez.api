import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query, Res,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {Listing} from "./listing.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {CreateListingDto} from "./data/createListing.dto";
import {UpdateListingDto} from "./data/updateListing.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Realtor} from "../realtors/realtor.entity";
import {multerOptions} from "../../../config/upload.config";
import {Photo} from "../photos/photo.entity";

@Controller('listings')
export class ListingsController {
    constructor(
        @InjectRepository(Listing)
        private readonly listingRepository: Repository<Listing>,
        @InjectRepository(Realtor)
        private readonly realtorRepository: Repository<Realtor>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {}

    @Get()
    async findAll(@Query() query) {
        const where:any = {};

        if (query.title) {
            where.title = Like(`%${query.title}%`);
        }

        if (query.status) {
            where.status = query.status;
        }

        if (query.realtor_id) {
            where.realtor = query.realtor_id;
        }

        const listings = await this
            .listingRepository
            .find(
                {
                    relations: [ 'photos', 'address', 'features', 'realtor'],
                    where,
                    order: {
                        id: "DESC"
                    }
                }
            );

        return {
            status_code: 200,
            message: "Listing fetched successfully",
            data: listings
        };
    }

    @Get(':id')
    async find(@Param('id') listingId: number) {
        const listing = await this.listingRepository.findOne(listingId, {relations: [ 'photos', 'address', 'features', 'realtor']});

        if (listing === undefined) {
            throw new NotFoundException();
        }

        return {
            status_code: 200,
            message: 'Listing found',
            data: listing,
        };
    }

    @Post()
    async create(@Body() requestData: CreateListingDto) {
        if (requestData.realtor) {
            const realtor = await this.realtorRepository.findOne(requestData.realtor);

            if (!realtor) {
                throw new BadRequestException("Realtor doest not exists");
            }

            requestData.realtor = realtor;
        }

        const listing = await this.listingRepository.save(requestData);

        return {
            status_code: 200,
            message: "Listing created successfully",
            data: listing
        };
    }

    @Post('/:id/photos')
    @UseInterceptors(FilesInterceptor('files', null, multerOptions))
    async upload(@Param('id') listingId: number, @UploadedFiles() files) {
        let listing = await this.listingRepository.findOne(listingId, {relations: ['photos']});

        if (listing === undefined) {
            throw new NotFoundException();
        }

        if (!files || files.length === 0) {
            throw new BadRequestException("No files received");
        }

        const newPhotos: Photo[] = files.map(file => {
            const photo = new Photo();
            photo.path = file.path;
            photo.filename = file.filename;

            return photo;
        });

        listing.photos = [
            ...listing.photos,
            ...newPhotos
        ];

        listing = await this.listingRepository.save(listing);

        // Hide photo path on response
        listing.photos = listing.photos.map(photo => {
            delete photo.path;
            return photo;
        });

        return {
            status_code: 200,
            message: "Photo(s) uploaded succesfully",
            data: listing
        };
    }

    @Get('photos/:name')
    async findPhoto(@Param('name') fileName: number, @Res() response) {
        const photo = await this.photoRepository.findOne({ where: { filename: fileName}});

        if (photo === undefined) {
            throw new NotFoundException();
        }

        return response.sendFile(photo.path, { root: './' });
    }

    @Delete('/:id/photos/:photoId')
    async destroyPhoto(@Param('id') listingId, @Param('photoId') photoId) {
        const photo = await this.photoRepository.findOne(photoId, {where: {listing_id: listingId}});

        if (photo === undefined) {
            throw new NotFoundException();
        }

        await this.photoRepository.delete(photoId);

        return {
            status_code: 200,
            message: "Photo deleted successfully",
        };
    }

    @Put(':id')
    async update(@Param('id') listingId: number, @Body() requestData: UpdateListingDto) {
        let listing = await this.listingRepository.findOne(listingId);

        if (listing === undefined) {
            throw new NotFoundException();
        }

        listing = await this.listingRepository.merge(listing, requestData);
        listing = await this.listingRepository.save(listing);

        return {
            status_code: 200,
            message: "Listing updated successfully",
            data: listing
        };
    }

    @Delete(':id')
    async destroy(@Param('id') listingId) {
        const listing = await this.listingRepository.findOne(listingId);

        if (listing === undefined) {
            throw new NotFoundException();
        }

        await this.listingRepository.delete(listingId);

        return {
            status_code: 200,
            message: "Listing deleted successfully",
        };
    }
}