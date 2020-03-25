import {Controller, Get} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Realtor} from "../realtors/realtor.entity";
import {Photo} from "../photos/photo.entity";
import * as faker from 'faker';
import * as moment from 'moment'
import {Listing} from "../listings/listing.entity";
import {ListingStatus} from "../listings/data/listingStatus.enum";
import {FeatureType} from "../features/data/featureType.enum";
import {Feature} from "../features/feature.entity";
import {Address} from "../addresses/address.entity";

@Controller('seed')
export class SeedsController {
    constructor(
        @InjectRepository(Listing)
        private readonly listingRepository: Repository<Listing>,
        @InjectRepository(Realtor)
        private readonly realtorRepository: Repository<Realtor>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {}

    @Get('/')
    async seed() {
        const realtors = await Promise.all([...Array(10)].map(async () => {
            return this.realtorRepository.save(this.makeRealtor());
        }));

        const listings = await Promise.all([...Array(100)].map(async () => {
            return this.listingRepository.save(this.makeListing(realtors));
        }));

        return {realtors, listings};
    }

    makeListing(realtors) {
        const listing = new Listing();
        listing.realtor = realtors[faker.random.number({min: 0, max: (realtors.length - 1)})];
        listing.features = [];

        const washroom = new Feature();
        washroom.type = FeatureType.WASHROOMS;
        washroom.value = '' + faker.random.number({min: 1, max: 4});

        const bedroom = new Feature();
        bedroom.type = FeatureType.BEDROOMS;
        bedroom.value = '' + faker.random.number({min: 1, max: 4});

        const garage = new Feature();
        garage.type = FeatureType.GARAGE;
        garage.value = '' + faker.random.number({min: 0, max: 2});

        listing.features = [washroom, bedroom, garage];

        const address = new Address();
        address.city = faker.address.city();
        address.country = faker.address.country();
        address.number = '' + faker.random.number({min: 1, max: 9999});
        address.postal_code = faker.address.zipCode();
        address.province = faker.address.state();
        address.street = faker.address.streetName();

        listing.address = address;

        listing.type = faker.random.number({min: 0, max: 5});
        listing.status = ListingStatus.SOLD;
        listing.title = faker.address.streetName();
        listing.description = faker.lorem.sentence();
        listing.price = faker.random.number({min: 100000, max: 2500000});
        listing.square_foot = faker.random.number({min: 30, max: 600});

        const today = moment().toDate();
        const oneYearAgo = moment().subtract(12, 'months').toDate();
        listing.sold_at = faker.date.between(oneYearAgo, today);

        return listing;
    }

    makeRealtor() {
        const gender = faker.random.number(1);
        const firstName = faker.name.firstName(gender);
        const lastName = faker.name.lastName(gender);
        const email = faker.internet.email(firstName, lastName);
        const name = `${firstName} ${lastName}`;
        const phone = faker.phone.phoneNumber();

        const realtor = new Realtor();
        realtor.name = name;
        realtor.email = email;
        realtor.phone = phone;

        return realtor;
    }
}