import {Listing} from "./listing.entity";
import {EntityRepository, Repository} from "typeorm";
import { NotFoundException, Injectable } from "@nestjs/common";

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {

    /**
     * @param id 
     */
    findOrFail(id: number) {
        const listing = this.findOne(id, { relations: [ 'photos', 'address', 'features'] });

        if (!listing) {
            throw new NotFoundException();
        }

        return listing;
    }
}