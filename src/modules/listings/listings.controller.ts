import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
import {Listing} from "./listing.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {CreateListingDto} from "./data/createListing.dto";
import {UpdateListingDto} from "./data/updateListing.dto";

@Controller('listings')
export class ListingsController {
    constructor(
        @InjectRepository(Listing)
        private readonly listingRepository: Repository<Listing>,
    ) {}

    @Get()
    async findAll(@Query() query) {
        if (query.title) {
            query.title = Like(`%${query.title}%`);
        }

        const listings = await this.listingRepository.find({ relations: [ 'photos', 'address', 'features'], where: query});

        return {
            status_code: 200,
            message: "Listing fetched successfully",
            data: listings
        };
    }

    @Post()
    async create(@Body() requestData: CreateListingDto) {
        const listing = await this.listingRepository.save(requestData);

        return {
            status_code: 200,
            message: "Listing created successfully",
            data: listing
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