import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from "class-validator";

@Entity({ name: 'addresses' })
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    street: string;

    @Column()
    @IsNotEmpty()
    number: string;

    @Column()
    @IsNotEmpty()
    postal_code: string;

    @Column()
    @IsNotEmpty()
    city: string;

    @Column()
    @IsNotEmpty()
    province: string;

    @Column()
    @IsNotEmpty()
    country: string;
}