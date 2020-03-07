import {IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';


export class CreateRealtorDto {
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber("+1")
    @IsOptional()
    phone: string;
}