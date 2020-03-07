import { IsNotEmpty, ValidateNested, IsPhoneNumber} from 'class-validator';
import {Type} from "class-transformer";


export class createRealtorDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsPhoneNumber("+1")
    phone: string;
}