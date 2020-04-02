import {IsArray, IsEnum, IsOptional, ValidateNested} from 'class-validator';
import {ListingType} from "./listingType.enum";
import {Feature} from "../../features/feature.entity";
import {Address} from "../../addresses/address.entity";
import {Type} from "class-transformer";
import {Realtor} from "../../realtors/realtor.entity";

export class UpdateListingDto {
    @IsEnum(ListingType)
    @IsOptional()
    type: number;

    @IsArray()
    @IsOptional()
    features: Feature[];

    @IsOptional()
    @ValidateNested()
    @Type(() => Address)
    address: Address;

    @IsOptional()
    realtor: Realtor;
}