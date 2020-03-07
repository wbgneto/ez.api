import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'realtors' })
export class Realtor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}