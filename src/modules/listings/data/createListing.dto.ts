import {IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested} from 'class-validator';
import {ListingType} from "./listingType.enum";
import {Feature} from "../../features/feature.entity";
import {Address} from "../../addresses/address.entity";
import {Type} from "class-transformer";
import {Realtor} from "../../realtors/realtor.entity";

export class CreateListingDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsEnum(ListingType)
    type: number;

    realtor;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    square_foot: number;

    @IsArray()
    features: Feature[];

    @ValidateNested()
    @Type(() => Address)
    address: Address;
}