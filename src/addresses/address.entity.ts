import {Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class api_address {
    @PrimaryColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    postal_code: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    lag_lang: string;

}