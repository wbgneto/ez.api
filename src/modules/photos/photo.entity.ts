import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Listing} from "../listings/listing.entity";

@Entity({ name: 'photos' })
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Listing, listing => listing.photos)
    // @JoinColumn({ name: 'listing_id', referencedColumnName: 'id' })
    listing: Listing;

    @Column()
    path: string;

    @Column()
    title: string;
}