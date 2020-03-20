import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Listing} from "../listings/listing.entity";
import {Exclude} from "class-transformer";

@Entity({ name: 'photos' })
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Listing, listing => listing.photos)
    @JoinColumn({ name: 'listing_id', referencedColumnName: 'id' })
    listing: Listing;

    @Column()
    filename: string;

    @Column()
    @Exclude()
    path: string;
}