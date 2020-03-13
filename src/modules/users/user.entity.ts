import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordTransformer } from './password.transformer';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({
        name: 'password',
        length: 255,
        transformer: new PasswordTransformer(),
    })
    @Exclude()
    password: string;
}