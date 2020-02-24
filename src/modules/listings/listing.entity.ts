import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {ListingType} from "./data/listingType.enum";
import {ListingStatus} from "./data/listingStatus.enum";

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    // @TODO - Relationship
    @Column({ nullable: true })
    address_id: number;

    // @TODO - Relationship
    @Column({ nullable: true })
    realtor_id: number;

    @Column({ type: "enum", enum: ListingType})
    type: number;

    @Column({ type: "enum", enum: ListingStatus})
    status: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    square_foot: number;

    @Column({ nullable: true })
    sold_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}