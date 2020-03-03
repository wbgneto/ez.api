import {Listing} from "./listing.entity";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {

}