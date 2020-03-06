import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FeatureType} from "./data/featureType.enum";
import {Listing} from "../listings/listing.entity";

@Entity({ name: 'features' })
export class Feature {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Listing, listing => listing.features, {
        onDelete:'CASCADE'
    })
    @JoinColumn({ name: 'listing_id', referencedColumnName: 'id' })
    listing: Listing;

    @Column({ type: "enum", enum: FeatureType})
    type: number;

    @Column()
    value: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}