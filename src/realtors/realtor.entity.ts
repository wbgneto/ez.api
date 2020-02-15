import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from "typeorm";
// import { api_address } from '../addresses/address.entity';

@Entity()
export class api_realtor {

    @PrimaryColumn()
    id: number;

    // @OneToOne(type => api_address)
    // @JoinColumn()
    @Column()
    addr_id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phone: string;

    @Column()
    created_at: Date;
}