import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';


export class CreateRealtorDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    phone: string;

    @IsEmail()
    @IsOptional()
    email: string;
}