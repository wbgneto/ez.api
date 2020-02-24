import {IsEnum, IsNotEmpty} from 'class-validator';
import {ListingType} from "./listingType.enum";

export class CreateListingDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsEnum(ListingType)
    type: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    square_foot: number;
}