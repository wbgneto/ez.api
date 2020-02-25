import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {Listing} from "./listing.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateListingDto} from "./data/createListing.dto";

@Controller('listings')
export class ListingsController {
    constructor(
        @InjectRepository(Listing)
        private readonly listingRepository: Repository<Listing>,
    ) {}

    @Get()
    findAll() {
        return this.listingRepository.find();
    }

    @Post()
    create(@Body() data: CreateListingDto) {
        return this.listingRepository.save(data);
    }

    @Put(':id')
    async update(@Param('id') listingId: number, @Body() data) {
        let listing = await this.listingRepository.findOne(listingId);

        if (listing === undefined) {
            throw new NotFoundException();
        }

        listing = await this.listingRepository.merge(listing, data);
        await this.listingRepository.save(listing);

        return {
            status_code: 200,
            message: "Listing updated successfully",
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