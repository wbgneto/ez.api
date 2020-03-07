import {IsOptional, IsPhoneNumber} from 'class-validator';


export class UpdateRealtorDto {
    @IsOptional()
    name: string;

    @IsPhoneNumber("+1")
    @IsOptional()
    phone: string;
}