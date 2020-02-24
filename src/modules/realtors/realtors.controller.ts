import { Controller, Post, Body, Get, Param, Put, Delete, Logger } from "@nestjs/common";
import { RealtorsService } from "./realtors.service";
import { validate } from 'class-validator';

@Controller('realtors')
export class RealtorsController {
    constructor(private realtorsService: RealtorsService) {}


    @Post()
    addRealtor(
        @Body('firstName') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string,
        @Body('addressId') realtorAddrId: number
    ) {
        const toValidate = {firstname: realtorFirstName, lastname: realtorLastName, phone: realtorPhone, addressId: realtorAddrId};
        validate('RealtorSchema', toValidate).then(errors => {
            if(errors.length > 0) {
                Logger.log("Validation failed: " + errors);
            } else {
                Logger.log("validation succeed ");
                this.realtorsService.insertRealtor(realtorFirstName, realtorLastName, realtorPhone, realtorAddrId);
            }
        }).catch(errors => {
            throw errors;
        });
    }

    @Get()
    getAllRealtors() {
        return this.realtorsService.getRealtors();
    }

    @Get(':id')
    getProduct(@Param('id') realtorId: number) {
        return this.realtorsService.getSingleRealtor(realtorId);
    }

    @Put(':id')
    updateRealtor(
        @Param('id') realtorId: number, 
        @Body('firstName') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string,
        @Body('addressId') realtorAddrId: number
        ) {
            const toValidate = {firstname: realtorFirstName, lastname: realtorLastName, phone: realtorPhone, addressId: realtorAddrId};
            validate('RealtorSchema', toValidate).then(errors => {
                if(errors.length > 0) {
                    Logger.log("Validation failed: " + errors);
                } else {
                    Logger.log("validation succeed ");
                    return this.realtorsService.updateRealtor(realtorId, realtorFirstName, realtorLastName, realtorPhone, realtorAddrId );
                }
            }).catch(errors => {
                throw errors;
            });
    }

    @Delete(':id')
    removeRealtor(@Param('id') realtorId: number) {
        this.realtorsService.deleteRealtor(realtorId);
        return null;
    }
}