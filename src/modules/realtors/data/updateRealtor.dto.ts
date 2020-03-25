import {IsOptional, IsPhoneNumber} from 'class-validator';


export class UpdateRealtorDto {
    @IsOptional()
    name: string;

    @IsOptional()
    phone: string;
}