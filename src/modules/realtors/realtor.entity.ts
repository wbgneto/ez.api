import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Realtor {
    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(type => api_address)
    // @JoinColumn()
    @Column()
    address_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    phone: string;

    @Column()
    created_at: Date;
}