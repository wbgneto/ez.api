import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, Unique, Index} from "typeorm";
import {ListingType} from "./data/listingType.enum";
import {ListingStatus} from "./data/listingStatus.enum";
import {Feature} from "../features/feature.entity";
import {Address} from "../addresses/address.entity";
import {Photo} from "../photos/photo.entity";

@Entity({name: 'listings'})
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Address, {
        cascade: true
    })
    @JoinColumn()
    address: Address;

    // @TODO - Relationship
    @Column({nullable: true})
    realtor_id: number;

    @OneToMany(type => Feature, feature => feature.listing, {
        cascade: true
    })
    features: Feature[];

    @OneToMany(type => Photo, photo => photo.listing, {
        cascade: true
    })
    photos: Photo[];

    @Column({type: "enum", enum: ListingType})
    type: number;

    @Column({type: "enum", enum: ListingStatus})
    status: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    square_foot: number;

    @Column({nullable: true})
    sold_at: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}