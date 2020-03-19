import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ListingType} from "./data/listingType.enum";
import {ListingStatus} from "./data/listingStatus.enum";
import {Feature} from "../features/feature.entity";
import {Address} from "../addresses/address.entity";
import {Photo} from "../photos/photo.entity";
import {Realtor} from "../realtors/realtor.entity";

@Entity({name: 'listings'})
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Address, {
        cascade: true,
        onDelete:'CASCADE'
    })
    @JoinColumn()
    address: Address;

    @ManyToOne(type => Realtor, realtor => realtor.listings)
    @JoinColumn()
    realtor: Realtor;

    @OneToMany(type => Feature, feature => feature.listing, {
        cascade: true,
        onDelete:'CASCADE'
    })
    features: Feature[];

    @OneToMany(type => Photo, photo => photo.listing, {
        cascade: true,
        onDelete:'CASCADE'
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